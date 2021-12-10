import Api from './index';

export const ApiSoftware = {
    async getSearch(filtro) {
        return await Api.Route()
            .get(`software/search?key=${filtro.key}&value=${filtro.value}`)
            .then(res => res.data)
            .catch(e => e);
    },
    async getAll() {
        return await Api.Route()
            .get(`software/getAll`)
            .then(res => res.data)
            .catch(e => e);
    },
    async post(data) {
        return await Api.Route()
            .post(`software/`, data)
            .then(res => res.data)
            .catch(e => e);
    },
    async put(data) {
        return await Api.Route()
            .put(`software/`, data)
            .then(res => res.data)
            .catch(e => e);
    },
    async delete(id) {
        return await Api.Route()
            .delete(`software/` + id)
            .then(res => res)
            .catch(e => e);
    },
}

export default ApiSoftware;
