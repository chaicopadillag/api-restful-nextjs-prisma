export const updateTodo = async (id: string, complete: boolean,) => {

    try {
        const resp = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ complete }),
            headers: { 'Content-Type': 'application/json' }
        },);

        if (!resp.ok) {
            throw {
                status: resp.status,
                statusText: resp.statusText
            }
        }

        const todo = await resp.json();

        return todo;
    } catch (error) {
        console.log(error)
    }

};



export const createTodo = async (description: string) => {

    try {
        const resp = await fetch(`/api/todos`, {
            method: 'POST',
            body: JSON.stringify({ description }),
            headers: { 'Content-Type': 'application/json' }
        },);

        if (!resp.ok) {
            throw {
                status: resp.status,
                statusText: resp.statusText
            }
        }

        const todo = await resp.json();

        return todo;
    } catch (error) {
        console.log(error)
    }

};


export const deleteTodosComplete = async () => {

    try {
        const resp = await fetch(`/api/todos/complete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        },);

        if (!resp.ok) {
            throw {
                status: resp.status,
                statusText: resp.statusText
            }
        }

        const todo = await resp.json();

        return todo;
    } catch (error) {
        console.log(error)
    }

};
