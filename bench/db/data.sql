USE ec_workbench;
SET NAMES utf8mb4;

INSERT INTO sys_user(id, merchant_id, username, password_hash, nickname, mobile, status, is_deleted, created_by, updated_by)
VALUES
(1,1,'admin','$2a$10$DowJonesIndexExampleHashReplaceByRealBCryptxxxxxxxxxxxx','系统管理员','13800000000',1,0,0,0),
(2,1,'operator','$2a$10$DowJonesIndexExampleHashReplaceByRealBCryptyyyyyyyyyyyy','运营人员','13900000000',1,0,1,1);

INSERT INTO sys_role(id, merchant_id, role_name, role_code, status, is_deleted, created_by, updated_by)
VALUES
(1,1,'超级管理员','SUPER_ADMIN',1,0,0,0),
(2,1,'运营专员','OPERATOR',1,0,1,1);

INSERT INTO sys_menu(id, merchant_id, parent_id, menu_name, menu_type, route_path, perms, sort_no, status, is_deleted, created_by, updated_by)
VALUES
(100,1,0,'系统管理',1,'/system',NULL,10,1,0,1,1),
(101,1,100,'用户管理',2,'/system/user','sys:user:list',11,1,0,1,1),
(102,1,100,'角色管理',2,'/system/role','sys:role:list',12,1,0,1,1),
(103,1,100,'菜单管理',2,'/system/menu','sys:menu:list',13,1,0,1,1),
(200,1,0,'商品中心',1,'/product',NULL,20,1,0,1,1),
(202,1,200,'商品管理',2,'/product/list','product:list',22,1,0,1,1),
(300,1,0,'订单中心',1,'/order',NULL,30,1,0,1,1),
(301,1,300,'订单管理',2,'/order/list','order:list',31,1,0,1,1),
(400,1,0,'库存管理',1,'/inventory',NULL,40,1,0,1,1),
(401,1,400,'库存流水',2,'/inventory/record','inventory:record:list',41,1,0,1,1),
(402,1,400,'库存预警',2,'/inventory/warn','inventory:warn:list',42,1,0,1,1),
(500,1,0,'仪表盘',2,'/dashboard','dashboard:view',1,1,0,1,1);

INSERT INTO sys_user_role(merchant_id, user_id, role_id, created_by)
VALUES (1,1,1,1),(1,2,2,1);

INSERT INTO sys_role_menu(merchant_id, role_id, menu_id, created_by)
SELECT 1,1,id,1 FROM sys_menu WHERE merchant_id=1;

INSERT INTO sys_role_menu(merchant_id, role_id, menu_id, created_by)
VALUES
(1,2,500,1),(1,2,200,1),(1,2,202,1),(1,2,300,1),(1,2,301,1),(1,2,400,1),(1,2,401,1),(1,2,402,1);

INSERT INTO product_category(id, merchant_id, parent_id, category_name, category_code, level_no, tree_path, sort_no, status, is_deleted, created_by, updated_by)
VALUES
(1000,1,0,'全部商品','ALL',1,'/1000/',1,1,0,1,1),
(1001,1,1000,'手机数码','DIGITAL',2,'/1000/1001/',1,1,0,1,1),
(1002,1,1000,'家用电器','HOME_APPLIANCE',2,'/1000/1002/',2,1,0,1,1);

INSERT INTO product(id, merchant_id, product_no, category_id, product_name, sub_title, brand_name, unit_name, sale_price, cost_price, market_price, stock_quantity, stock_warn_threshold, status, audit_status, is_deleted, created_by, updated_by)
VALUES
(2000,1,'P202603310001',1001,'智能手机 X1','8G+256G','DemoBrand','台',2999.00,2400.00,3299.00,119,20,1,1,0,1,1),
(2001,1,'P202603310002',1002,'空气净化器 A9','家庭版','CleanAir','台',1299.00,900.00,1599.00,8,10,1,1,0,1,1);

INSERT INTO orders(id, merchant_id, order_no, order_status, pay_status, delivery_status, customer_name, customer_mobile, receiver_name, receiver_mobile, address_detail, total_amount, payable_amount, paid_amount, seller_remark, is_deleted, created_by, updated_by)
VALUES
(3000,1,'O202603310001',1,2,0,'张三','13700000000','张三','13700000000','深圳市南山区科技园1号',2999.00,2899.00,2899.00,'VIP客户',0,2,2);

INSERT INTO order_item(id, merchant_id, order_id, order_no, product_id, product_no, product_name, sku_attr, unit_price, quantity, line_total_amount, item_status)
VALUES
(4000,1,3000,'O202603310001',2000,'P202603310001','智能手机 X1','颜色:黑色;容量:8G+256G',2899.00,1,2899.00,0);

INSERT INTO inventory_record(id, merchant_id, record_no, product_id, biz_type, biz_no, change_qty, stock_before, stock_after, operator_id, remark)
VALUES
(5000,1,'IR202603310001',2000,6,'INIT-2000',120,0,120,1,'初始化库存'),
(5001,1,'IR202603310002',2000,2,'O202603310001',-1,120,119,2,'订单出库');
