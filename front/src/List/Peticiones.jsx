const HOST_API = "http://127.0.0.1:8080/api/"

const peticiones = {

    find: async () => {
        return fetch(HOST_API + "list")
            .catch(error => console.error('Error:', error))
    },

    save: async (request) => {
        return fetch(HOST_API + "/todolist", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch(error => console.error('Error:', error))

    },

    update: async (listId, request) => {
        return fetch(HOST_API + listId + "/todo", {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => console.error('Error:', error))
    },

    delete: async (listId) => {
        return fetch(HOST_API + listId + "/todolist", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => console.error('Error:', error))
    },

}

export default peticiones;