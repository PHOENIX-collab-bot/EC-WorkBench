import { useState } from 'react';
import {
    Button,
    Card,
    Empty,
    Form,
    Image,
    Input,
    InputNumber,
    Modal,
    Select,
    Spin,
    Space,
    Tag,
    Typography,
    Upload,
    message
} from 'antd';
import { CopyOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { generateCopywriting } from '@/api/copywriting';
import './CreativeAssistantPage.css';

const { Text, Paragraph } = Typography;

interface GenerateFormValues {
    productName: string;
    productHighlights: string;
    price?: number;
    promotion?: string;
    tone: 'professional' | 'friendly' | 'premium';
    callToAction?: string;
    generateCount: number;
}

interface DraftResult {
    id: string;
    imageUrl: string;
    title: string;
    subtitle: string;
    bullets: string[];
    cta: string;
}

function buildPromptByTone(tone: GenerateFormValues['tone'], index: number): string {
    const versionHint = `请给出第${index + 1}版，和前一版表达明显不同。`;
    const outputRule = '输出要求：只输出一版；不要出现“第X版/版本X/方案X”等字样；不要使用编号或项目符号；不要重复句子。';
    if (tone === 'premium') {
        return `请写一条高端质感电商文案，要求：简洁克制、突出品质与细节、100字以内。${versionHint}${outputRule}`;
    }
    if (tone === 'friendly') {
        return `请写一条亲和活力电商文案，要求：口语化、有感染力、适合社媒传播、100字以内。${versionHint}${outputRule}`;
    }
    return `请写一条专业简约电商文案，要求：结构清晰、突出卖点与利益点、100字以内。${versionHint}${outputRule}`;
}

function parseAiContent(content: string, values: GenerateFormValues): Omit<DraftResult, 'id' | 'imageUrl'> {
    const normalizeForCompare = (text: string): string => text.replace(/[\s，。！？!?,；;：:、\-—]/g, '').toLowerCase();

    const cleanedText = content
        .replace(/\r/g, '\n')
        .replace(/\*\*/g, '')
        .replace(/\[\s*第[一二三四五六七八九十两\d]+版\s*\]/g, '')
        .replace(/第[一二三四五六七八九十两\d]+版[：:]?/g, '')
        .replace(/版本[一二三四五六七八九十两\d]+[：:]?/g, '')
        .replace(/方案[一二三四五六七八九十两\d]+[：:]?/g, '')
        .replace(/【\s*第[一二三四五六七八九十两\d]+版\s*】/g, '')
        .trim();

    const lineCandidates = cleanedText
        .split('\n')
        .map((line) => line
            .replace(/^[-•●▪◦·\s]+/, '')
            .replace(/^\d+[.)、\s]+/, '')
            .trim())
        .filter(Boolean);

    const sentenceCandidates = cleanedText
        .split(/[。！？!?；;\n]/)
        .map((x) => x.trim())
        .filter(Boolean);

    const segments = (lineCandidates.length >= 2 ? lineCandidates : sentenceCandidates)
        .filter((x, idx, arr) => arr.indexOf(x) === idx)
        .filter((x) => x.length > 1);

    const uniqueSegments = segments.filter((x, idx, arr) => {
        const current = normalizeForCompare(x);
        return arr.findIndex((y) => normalizeForCompare(y) === current) === idx;
    });

    const title = (uniqueSegments[0] || `${values.productName}｜AI生成文案`).slice(0, 36);
    const subtitle = uniqueSegments[1] || values.productHighlights;
    const bullets = uniqueSegments
        .slice(2)
        .filter((x) => x !== title && x !== subtitle)
        .slice(0, 3);

    return {
        title,
        subtitle,
        bullets: bullets.length > 0 ? bullets : [values.productHighlights],
        cta: values.callToAction || '立即了解'
    };
}

function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function getToneStyle(tone: GenerateFormValues['tone']): { bg: string; accent: string } {
    if (tone === 'premium') return { bg: '#f8f9fa', accent: '#1f1f1f' };
    if (tone === 'friendly') return { bg: '#f1f8ff', accent: '#1a73e8' };
    return { bg: '#ffffff', accent: '#1967d2' };
}

function buildCopy(values: GenerateFormValues, idx: number): Omit<DraftResult, 'id' | 'imageUrl'> {
    const templates = [
        {
            title: `${values.productName}｜核心卖点一图讲清`,
            subtitle: `${values.productHighlights}${values.promotion ? `，${values.promotion}` : ''}`,
            bullets: [
                values.productHighlights,
                values.promotion || '支持限时活动、日常上新等场景',
                values.price ? `参考价格：¥${values.price}` : '价格信息可在详情页进一步补充'
            ]
        },
        {
            title: `${values.productName}｜运营主推草稿`,
            subtitle: `${values.productHighlights}，转化表达更直接`,
            bullets: [
                values.price ? `到手价参考：¥${values.price}` : '建议搭配优惠信息强化吸引力',
                values.promotion || '可叠加满减、限时活动信息',
                '文案结构清晰，便于A/B测试'
            ]
        },
        {
            title: `${values.productName}｜高点击素材草稿`,
            subtitle: `一图讲清卖点，转化更直接`,
            bullets: [
                values.productHighlights,
                values.promotion || '可用于首页焦点图、详情页首屏、私域素材',
                '支持运营二次编辑后直接投放'
            ]
        }
    ];

    const selected = templates[idx % templates.length];
    return {
        ...selected,
        cta: values.callToAction || '立即了解'
    };
}

function renderCoverImage(values: GenerateFormValues, sourceImage?: string, index = 0): Promise<string> {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = 900;
        canvas.height = 900;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            resolve('');
            return;
        }

        const { bg, accent } = getToneStyle(values.tone);
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#e8eaed';
        ctx.fillRect(40, 40, canvas.width - 80, canvas.height - 80);

        const drawText = () => {
            ctx.fillStyle = accent;
            ctx.font = 'bold 48px sans-serif';
            ctx.fillText(values.productName, 70, 560);

            ctx.fillStyle = '#5f6368';
            ctx.font = '32px sans-serif';
            ctx.fillText(values.productHighlights, 70, 620);

            if (values.price) {
                ctx.fillStyle = '#202124';
                ctx.font = 'bold 56px sans-serif';
                ctx.fillText(`¥${values.price}`, 70, 710);
            }

            if (values.promotion) {
                ctx.fillStyle = '#1a73e8';
                ctx.fillRect(70, 740, 260, 56);
                ctx.fillStyle = '#fff';
                ctx.font = '30px sans-serif';
                ctx.fillText(values.promotion, 88, 779);
            }

            ctx.strokeStyle = '#dadce0';
            ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

            ctx.fillStyle = '#9aa0a6';
            ctx.font = '24px sans-serif';
            ctx.fillText(`草稿 ${index + 1}`, 730, 850);

            resolve(canvas.toDataURL('image/png'));
        };

        if (!sourceImage) {
            drawText();
            return;
        }

        const img = new window.Image();
        img.onload = () => {
            const maxW = canvas.width - 120;
            const maxH = 420;
            const scale = Math.min(maxW / img.width, maxH / img.height);
            const drawW = img.width * scale;
            const drawH = img.height * scale;
            const x = (canvas.width - drawW) / 2;
            const y = 90 + (maxH - drawH) / 2;
            ctx.drawImage(img, x, y, drawW, drawH);
            drawText();
        };
        img.onerror = () => drawText();
        img.src = sourceImage;
    });
}

export default function CreativeAssistantPage(): JSX.Element {
    const [form] = Form.useForm<GenerateFormValues>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [sourceImage, setSourceImage] = useState<string>();
    const [results, setResults] = useState<DraftResult[]>([]);
    const [generating, setGenerating] = useState(false);
    const [resultModalOpen, setResultModalOpen] = useState(false);
    const onGenerate = async (values: GenerateFormValues): Promise<void> => {
        setResultModalOpen(true);
        setResults([]);
        setGenerating(true);
        try {
            const next: DraftResult[] = [];
            let apiFailed = false;
            for (let i = 0; i < values.generateCount; i += 1) {
                let copy: Omit<DraftResult, 'id' | 'imageUrl'>;
                try {
                    const aiText = await generateCopywriting({
                        productName: values.productName,
                        salePrice: Number(values.price),
                        style: values.tone,
                        prompt: `${buildPromptByTone(values.tone, i)}\n商品补充卖点：${values.productHighlights}`
                    });
                    copy = parseAiContent(aiText, values);
                } catch {
                    apiFailed = true;
                    copy = buildCopy(values, i);
                }
                const imageUrl = await renderCoverImage(values, sourceImage, i);
                next.push({
                    id: `${Date.now()}-${i}`,
                    imageUrl,
                    ...copy
                });
            }
            setResults(next);
            message.success(`已生成 ${next.length} 份草稿`);
            if (apiFailed) {
                message.warning('部分草稿由本地模板兜底生成，请检查后端AI服务状态');
            }
        } finally {
            setGenerating(false);
        }
    };

    const copyDraft = async (item: DraftResult): Promise<void> => {
        const content = `${item.title}\n${item.subtitle}\n${item.bullets.map((x) => `• ${x}`).join('\n')}\n${item.cta}`;
        try {
            await navigator.clipboard.writeText(content);
            message.success('文案已复制');
        } catch {
            message.error('复制失败，请手动复制');
        }
    };

    const copyAllDrafts = async (): Promise<void> => {
        const merged = results
            .map((item, index) => `【草稿${index + 1}】\n${item.title}\n${item.subtitle}\n${item.bullets.map((x) => `• ${x}`).join('\n')}\n${item.cta}`)
            .join('\n\n');
        try {
            await navigator.clipboard.writeText(merged);
            message.success('全部文案已复制');
        } catch {
            message.error('复制失败，请手动复制');
        }
    };

    const resetAll = (): void => {
        form.resetFields();
        setFileList([]);
        setSourceImage(undefined);
        setResults([]);
        setResultModalOpen(false);
    };

    return (
        <div className="page-card creative-page">
            <div className="creative-header">
                <div>
                    <Typography.Title level={4} style={{ margin: 0 }}>AI商品创作</Typography.Title>
                    <Text type="secondary">输入必要信息，快速生成可编辑的主图与文案草稿</Text>
                </div>
                <Tag bordered={false} color="blue">快捷工具</Tag>
            </div>

            <Card title="商品信息输入" className="creative-panel creative-input-panel" styles={{ body: { paddingTop: 12 } }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onGenerate}
                    initialValues={{
                        tone: 'professional',
                        generateCount: 3,
                        callToAction: '立即抢购'
                    }}
                >
                    <Form.Item label="商品名称" name="productName" rules={[{ required: true, message: '请输入商品名称' }]}>
                        <Input placeholder="例如：轻羽保温杯 500ml" />
                    </Form.Item>

                    <Form.Item label="核心卖点" name="productHighlights" rules={[{ required: true, message: '请输入核心卖点' }]}>
                        <Input.TextArea rows={2} placeholder="例如：6小时长效保温，316不锈钢内胆" />
                    </Form.Item>

                    <Space size={12} className="creative-inline-fields" wrap>
                        <Form.Item
                            label="价格"
                            name="price"
                            className="creative-inline-item"
                            rules={[{ required: true, message: '请输入价格' }, { type: 'number', min: 0.01, message: '价格必须大于0' }]}
                        >
                            <InputNumber style={{ width: '100%' }} min={0} precision={2} placeholder="例如：99" />
                        </Form.Item>

                        <Form.Item label="活动信息" name="promotion" className="creative-inline-item">
                            <Input placeholder="例如：限时立减20元" />
                        </Form.Item>
                    </Space>

                    <Space size={12} className="creative-inline-fields" wrap>
                        <Form.Item label="风格" name="tone" className="creative-inline-item">
                            <Select
                                options={[
                                    { label: '专业简约', value: 'professional' },
                                    { label: '亲和活力', value: 'friendly' },
                                    { label: '高端质感', value: 'premium' }
                                ]}
                            />
                        </Form.Item>

                        <Form.Item label="生成数量" name="generateCount" className="creative-inline-item">
                            <Select options={[2, 3, 4, 5, 6].map((n) => ({ label: `${n} 份`, value: n }))} />
                        </Form.Item>
                    </Space>

                    <Form.Item label="行动引导语" name="callToAction">
                        <Input placeholder="例如：点击立即抢购" />
                    </Form.Item>

                    <Form.Item label="商品参考图（可选）">
                        <Upload
                            accept="image/*"
                            beforeUpload={() => false}
                            fileList={fileList}
                            maxCount={1}
                            onChange={async ({ fileList: nextList }) => {
                                setFileList(nextList);
                                const raw = nextList[0]?.originFileObj;
                                if (raw) {
                                    const dataUrl = await fileToDataUrl(raw as File);
                                    setSourceImage(dataUrl);
                                } else {
                                    setSourceImage(undefined);
                                }
                            }}
                        >
                            <Button icon={<UploadOutlined />}>上传商品图</Button>
                        </Upload>

                        {sourceImage && (
                            <div className="upload-preview-wrap">
                                <Text type="secondary" className="upload-preview-label">已上传预览</Text>
                                <Image src={sourceImage} className="upload-preview-image" />
                            </div>
                        )}
                    </Form.Item>

                    <Space className="creative-actions">
                        <Button type="primary" htmlType="submit" loading={generating}>生成主图与文案</Button>
                        <Button onClick={resetAll}>重置</Button>
                    </Space>
                </Form>
            </Card>

            <Modal
                title="生成结果"
                open={resultModalOpen}
                onCancel={() => setResultModalOpen(false)}
                width={980}
                maskStyle={{ backdropFilter: 'blur(6px)', background: 'rgba(15, 23, 42, 0.28)' }}
                footer={[
                    <Button key="copyAll" onClick={copyAllDrafts} disabled={results.length === 0 || generating}>复制全部文案</Button>,
                    <Button key="close" type="primary" onClick={() => setResultModalOpen(false)}>关闭</Button>
                ]}
            >
                {generating ? (
                    <div className="creative-loading">
                        <Spin size="large" tip="AI正在生成文案和主图，请稍候..." />
                    </div>
                ) : results.length === 0 ? (
                    <div className="creative-empty">
                        <Empty description="暂无生成结果" />
                    </div>
                ) : (
                    <Space direction="vertical" size={16} style={{ width: '100%' }}>
                        {results.map((item, idx) => (
                            <Card key={item.id} type="inner" title={`草稿 ${idx + 1}`} className="result-card">
                                <div className="result-layout">
                                    <div className="result-layout-image">
                                        <Image src={item.imageUrl} className="result-image" />
                                    </div>
                                    <div className="result-layout-content">
                                        <Typography.Title level={5} className="result-title">{item.title}</Typography.Title>
                                        <Paragraph type="secondary" className="result-subtitle">{item.subtitle}</Paragraph>
                                        <ul className="result-bullets">
                                            {item.bullets.map((b) => (
                                                <li key={b}><Text>{b}</Text></li>
                                            ))}
                                        </ul>
                                        <Tag bordered={false} color="blue">{item.cta}</Tag>
                                        <div className="result-actions">
                                            <Button icon={<CopyOutlined />} onClick={() => copyDraft(item)}>复制文案</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </Space>
                )}
            </Modal>
        </div>
    );
}
