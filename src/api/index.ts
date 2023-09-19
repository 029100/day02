import http from './http'
interface Iuser {
    username: string,
    password: string
}
// 登录接口
export const loginApi = (params: Iuser) => http.post('/login', params)
// 左侧菜单数据
export const menuApi = () => http.get('/menus')
// 分类
interface Icategory {
    type?: number,
    pagenum?: number,
    pagesize?: number
}
export const queryCategoriesApi = (params: Icategory) => http.get('/categories', params)

// 添加
interface Iadd {
    cat_pid: number,
    cat_name: string,
    cat_level: number
}
export const addGoodsApi = (params: Iadd) => http.post('/categories', params)

// 删除
export const delGoodsApi = (params:any) => http.delete('/categories/'+params)

interface Iedit {
    cat_id: number;
    cat_name: string;
}
export const editGoodsApi = (params: Iedit) => http.put("/categories/"+params.cat_id, params);
