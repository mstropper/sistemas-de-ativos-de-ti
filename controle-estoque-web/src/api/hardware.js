import Api from './index';

export const ApiHardware = {
    async getSearch(filtro) {
        return await Api.Route()
            .get(`hardware/search?key=${filtro.key}&value=${filtro.value}`)
            .then(res => res.data)
            .catch(e => e);
    },
    async getAll() {
        return await Api.Route()
            .get(`hardware/getAll`)
            .then(res => res.data)
            .catch(e => e);
    },
    async post(data) {
        return await Api.Route()
            .post(`hardware/`, data)
            .then(res => res.data)
            .catch(e => e);
    },
    async put(data) {
        return await Api.Route()
            .put(`hardware/`, data)
            .then(res => res.data)
            .catch(e => e);
    },
    async delete(id) {
        return await Api.Route()
            .delete(`hardware/` + id)
            .then(res => res)
            .catch(e => e);
    },
}

export default ApiHardware;
