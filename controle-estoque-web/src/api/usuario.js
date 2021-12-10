import Api from './index';

export const ApiUsuario = {
    async getGruposAcesso() {
        return await Api.Route()
            .get(`usuario/getGruposAcesso`)
            .then(res => res.data)
            .catch(e => e);
    },
    async post(data) {
        return await Api.Route()
            .post(`usuario/`, data)
            .then(res => res.data)
            .catch(e => e);
    },
    async put(data) {
        return await Api.Route()
            .put(`usuario/`, data)
            .then(res => res.data)
            .catch(e => e);
    },
    async postLogin(data) {
        return await Api.Route()
            .post(`usuario/login`, data)
            .then(res => res.data)
            .catch(e => e);
    },
    async getAll() {
        return await Api.Route()
            .get('usuario/getAll')
            .then(res => res.data)
            .catch(e => e)
    },
    async delete(id) {
        return await Api.Route()
            .delete('usuario/' + id)
            .then(res => res)
            .catch(e => e)
    },
}

export default ApiUsuario;