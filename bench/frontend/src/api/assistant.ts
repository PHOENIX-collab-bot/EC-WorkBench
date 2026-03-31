import request from '@/utils/request';
import type { DashboardMetrics } from '@/types/dashboard';

export interface AiAssistantAskRequest {
    question: string;
    dashboard?: DashboardMetrics;
}

export function askAiAssistantApi(data: AiAssistantAskRequest): Promise<string> {
    return request.post('/ai/assistant/ask', data, { timeout: 60000 });
}
