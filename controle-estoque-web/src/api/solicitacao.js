import Api from './index';

export const ApiSolicitacao = {
    async post(data) {
        return await Api.Route()
            .post(`solicitacao/`, data)
            .then(res => res.data)
            .catch(e => e);
    },
    async getAll() {
        return await Api.Route()
            .get(`solicitacao/getAll/`)
            .then(res => res.data)
            .catch(e => e);
    },
    async delete(id) {
        return await Api.Route()
            .delete(`solicitacao/${id}`)
            .then(res => res.data)
            .catch(e => e);
    },
    async putStatus(id) {
        return await Api.Route()
            .put(`solicitacao/${id}`)
            .then(res => res.data)
            .catch(e => e);
    },
    async getIndicadores() {
        return await Api.Route()
            .get('solicitacao/indicadores')
            .then(res => res.data)
            .catch(e => e)
    },
    async getCadastrados() {
        return await Api.Route()
            .get('solicitacao/cadastrados')
            .then(res => res.data)
            .catch(e => e)
    },
}

export default ApiSolicitacao;
