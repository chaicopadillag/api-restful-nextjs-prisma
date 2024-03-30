import { Todo } from '@prisma/client'
import { FC, startTransition, useOptimistic } from 'react'
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa'

type Props = {
    todo: Todo
    toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>
}


export const TodoItem: FC<Props> = ({ todo, toggleTodo }) => {

    const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(todo, (state, newValue: boolean) => ({ ...state, complete: newValue }))


    const onToggleTodo = async () => {
        try {
            startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
            await toggleTodo(todoOptimistic.id, !todoOptimistic.complete)

        } catch (error) {

            startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
        }

    }

    return (
        <div className={todoOptimistic.complete ? 'todoDone' : 'todoPending'}>
            <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>

                <div className="flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 bg-blue-100 mr-2" onClick={onToggleTodo}>
                    {todoOptimistic.complete ? <FaCheckSquare size={24} /> :
                        <FaRegSquare size={24} />}
                </div>

                <div className="text-center sm:text-left">{todoOptimistic.description}</div>
            </div>
        </div>
    )
}
