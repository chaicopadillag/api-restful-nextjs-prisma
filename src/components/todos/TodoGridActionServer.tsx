"use client"
import { toggleTodoAction } from '@/server-actions';
import { Todo } from '@prisma/client';
import { FC } from 'react';
import { TodoItem } from './TodoItem';

type Props = {
    todos: Todo[];
}

export const TodoGridActionServer: FC<Props> = ({ todos }) => {


    return (
        <div className='grid  grid-cols-1 sm:grid-cols-3 gap-2'>
            {todos.map(todo => <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodoAction} />)}

        </div>
    )
}
