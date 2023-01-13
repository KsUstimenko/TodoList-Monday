import React, {useState} from 'react';
import './App.css';
import TodoList, {TypeDeals} from "./TodoList";
import {v1} from "uuid";

/// СПИСОК ЗНАЧЕНИЙ КНОПОК ДЛЯ ФИЛЬТРАЦИИ СПИСКА ЗАДАЧ:
export type ButtonsValues = "Все" | "Готово" | "Не готово"

function App() {

    /// СПИСОК ЗАДАЧ НА ВХОД С ОБРАБОТЧИКОМ СОБЫТИЙ:
    const [deals, setDeals] = useState<Array<TypeDeals>>([
        {id: v1(), dealName: "Программировать", isDone: true},
        {id: v1(), dealName: "Заниматься в спортзале", isDone: false}
    ])

    /// ФУНКЦИЯ ДЛЯ ДОБАВЛЕНИЯ ЗАДАЧ:
    function funcAddDeal (dealName: string) {
        setDeals([{
            id: v1(),
            dealName,
            isDone: false}, ...deals])
    }

    /// ФУНКЦИЯ ДЛЯ УДАЛЕНИЯ ЗАДАЧ:
    function funcRemoveDeal(selectedID: string) {
        const withoutRemovedDeal = deals.filter(currentDeal => currentDeal.id !== selectedID)
        setDeals(withoutRemovedDeal)
    }

    /// ФУНКЦИЯ ДЛЯ ИЗМЕНЕНИЯ СТАТУСА ЗАДАЧИ:
    function funcChangeStatusDeal (selectedID: string, isDoneValue: boolean) {
        setDeals(deals.map(currentDeal => currentDeal.id === selectedID ? {...currentDeal, isDone: isDoneValue} : currentDeal))
    }

    /// СПИСОК ЗНАЧЕНИЙ КНОПОК ДЛЯ ФИЛЬТРАЦИИ СПИСКА ЗАДАЧ С ОБРАБОТЧИКОМ СОБЫТИЙ:
    const [buttons, setButtons] = useState<ButtonsValues>("Все")

    /// ФУНКЦИЯ ДЛЯ ОТСЛЕЖИВАНИЯ СОСТОЯНИЯ ТЕКУЩЕГО СПИСКА:
    function funcButtonCurrentValue (value: ButtonsValues) {
        setButtons(value)
    }

    /// ФУНКЦИЯ ДЛЯ ФИЛЬТРАЦИИ СПИСКА ЗАДАЧ ПО ЗНАЧЕНИЯМ КНОПОК:
    function getFilteredList (deals: Array<TypeDeals>, buttons: ButtonsValues): Array<TypeDeals> {
        switch (buttons) {
            case "Готово": return deals.filter(currentDeal => currentDeal.isDone)
            case "Не готово": return deals.filter(currentDeal => !currentDeal.isDone)
            default: return deals
        }
    }

    /// ВЫЗОВ ФУНКЦИИ TodoList:
    return (
        <div>
            <TodoList
                header={"ЧТО НУЖНО СДЕЛАТЬ СЕГОДНЯ?"}
                funcAddDeal={funcAddDeal}
                funcRemoveDeal={funcRemoveDeal}
                funcChangeStatusDeal={funcChangeStatusDeal}
                funcButtonCurrentValue={funcButtonCurrentValue}
                buttonsValues={buttons}
                deals={getFilteredList(deals, buttons)}
            />
        </div>
    );
}

export default App;