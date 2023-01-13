import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ButtonsValues} from "./App";

/// ТИПИЗАЦИЯ ВСЕГО СПИСКА:
type TypeTodo = {
    header: string
    funcAddDeal: (nameOfDeal: string) => void
    funcRemoveDeal: (selectedID: string) => void
    funcChangeStatusDeal: (selectedID: string, isDone: boolean) => void
    buttonsValues: ButtonsValues
    funcButtonCurrentValue: (value: ButtonsValues) => void
    deals: Array<TypeDeals>
}

/// ТИПИЗАЦИЯ ДАННЫХ ВНУТРИ СПИСКА:
export type TypeDeals = {
    id: string
    dealName: string
    isDone: boolean
}

function TodoList(props: TypeTodo) {

    /// КОНСТАНТА ДЛЯ ДОБАВЛЕНИЯ НОВЫХ ЗАДАЧ С ОБРАБОТЧИКОМ СОБЫТИЙ:
    const [dealName, setDealName] = useState<string>("")

    /// КОНСТАНТА ДЛЯ ОТОБРАЖЕНИЯ ОШИБКИ ПРИ ДОБАВЛЕНИИ ПУСТОЙ СТРОКИ С ОБРАБОТЧИКОМ СОБЫТИЙ:
    const [error, setError] = useState<boolean>(false)

    /// ФУНКЦИЯ addDeal ДЛЯ ДОБАВЛЕНИЯ НОВЫХ НЕ ПУСТЫХ ЗАДАЧ:
    function addingDeal() {
        const trimmedDealName = dealName.trim()
        if (trimmedDealName) {
            props.funcAddDeal(trimmedDealName)
        } else {
            setError(true)
        }
        setDealName("")
    }

    /// ФУНКЦИЯ-ПОВЕДЕНИЕ ПОЛЯ ПРИ УКАЗАНИИ НАЗВАНИЯ ЗАДАНИЯ:
    function setOnChange(event: ChangeEvent<HTMLInputElement>) {
        if (error) {
            setError(false)
        }
        setDealName(event.currentTarget.value)
    }

    /// ФУНКЦИЯ-ПОВЕДЕНИЕ ПОЛЯ ПРИ ОТПРАВКЕ НОВОГО ЗАДАНИЯ:
    function setOnKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            addingDeal()
        }
    }

    /// ФУНКЦИЯ-ПОВЕДЕНИЕ ПРИ НАЖАТИИ НА КНОПОК "ВСЕ", "ГОТОВО", "НЕ ГОТОВО":
    function getOnClickValue(button: ButtonsValues) {
        return () => props.funcButtonCurrentValue(button)
    }

    /// ФУНКЦИЯ ДЛЯ АВТОМАТИЧЕСКОЙ ОТРИСОВКИ ТЕКУЩЕГО СПИСКА ЗАДАЧ
    /// ТАКЖЕ ВЫЗОВ ФУНКЦИИ funcRemoveDeal ДЛЯ УДАЛЕНИЯ ЗАДАЧИ ПО КНОПКЕ "x"
    /// ТАКЖЕ ВЫЗОВ ФУНКЦИИ funcChangeStatusDeal ДЛЯ ИЗМЕНЕНИЯ СТАТУСА ЗАДАЧ:
    const automaticTodoList =
        props.deals.length ? props.deals.map((currentDeal) => {

            function removingDeal() {
                props.funcRemoveDeal(currentDeal.id)
            }
            function changingStatusDeal(event: ChangeEvent<HTMLInputElement>) {
                props.funcChangeStatusDeal(currentDeal.id, event.currentTarget.checked)
            }

            /// RETURN КОНСТАНТЫ automaticTodoList:
            return (
                <li key={currentDeal.id}>
                    <input type="checkbox"
                           checked={currentDeal.isDone}
                           onChange={changingStatusDeal}/>

                    <span className={currentDeal.isDone ? "deal-done" : ""}>
                    {currentDeal.dealName}
                </span>

                    <button onClick={removingDeal}>x</button>
                </li>
            )
        }) : <span>Тут пусто</span>

    /// RETURN КОМПОНЕНТЫ TodoList:
    return (
        <div>

            <h3>{props.header}</h3>

            <div>
                <input
                    value={dealName}
                    onChange={setOnChange}
                    onKeyDown={setOnKeyDown}
                    className={error ? "input-error" : ""}/>

                <button onClick={addingDeal}>+</button>
                {error && <div>Введено пустое поле</div>}
            </div>

            <ul>{automaticTodoList}</ul>

            <div>
                <button className={props.buttonsValues === "Все" ? "button-active" : ""}
                        onClick={getOnClickValue("Все")}>Все
                </button>
                <button className={props.buttonsValues === "Готово" ? "button-active" : ""}
                        onClick={getOnClickValue("Готово")}>Готово
                </button>
                <button className={props.buttonsValues === "Не готово" ? "button-active" : ""}
                        onClick={getOnClickValue("Не готово")}>Не готово
                </button>
            </div>

        </div>
    );
}

export default TodoList;