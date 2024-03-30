"use client"
import * as apiTodo from '@/helpers';
import { Todo } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { TodoItem } from './TodoItem';

type Props = {
    todos: Todo[];
}

export const TodoGrid: FC<Props> = ({ todos }) => {

    const router = useRouter()

    const toggleTodo = async (id: string, complete: boolean) => {
        await apiTodo.updateTodo(id, complete);
        router.refresh()
    }

    return (
        <div className='grid  grid-cols-1 sm:grid-cols-3 gap-2'>
            {todos.map(todo => <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />)}

        </div>
    )
}
