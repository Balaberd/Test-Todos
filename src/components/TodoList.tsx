import React, {useEffect} from 'react';
import {useTypeSelector} from "../hooks/useTypeSelector";
import {stat} from "fs";
import {useActions} from "../hooks/useAction";

export const TodoList: React.FC = () => {
    const {page, todos, error, loading, limit} = useTypeSelector(state => state.todo)
    const {fetchTodos, setTodoPage} = useActions();
    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    useEffect( ()=> {
        fetchTodos(page, limit)
    },[page])

    if(loading) {
        return <h1>Идет загрузка...</h1>
    }
    if(error) {
        return  <h1>{error}</h1>
    }

    return (
        <div>
            {todos.map(todo =>
                <div key={todo.id}>{todo.id} - {todo.title}</div>
            )}
            <div style={{display: "flex"}}>
                {pages.map( p =>
                    <div
                        onClick={ () => setTodoPage(p) }
                        key={p}
                        style={{ border: p === page ? '2px solid green' : "1px solid gray", padding: 10, margin: 5 }}
                    >
                        {p}
                    </div>
                )}
            </div>
        </div>
    );
};

