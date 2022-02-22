import { useExpenseContext } from "./context/context";
import {incomeCategories,expenseCategories,resetCategories} from "./constants/categories";


const useTransactions = (title) => {
    resetCategories()

    const {transactions} = useExpenseContext()


    const transactionsPerType = transactions.filter((t) => t.type === title)

    
    const total = transactionsPerType.reduce((s,i) => s += i.amount ,0)

    const categories = title === "Income" ? incomeCategories : expenseCategories;

    transactionsPerType.forEach((t) => {
        const category = categories.find((c) => c.type === t.category)

        if(category) category.amount += t.amount
    })

    const filteredCategories = categories.filter((c) => c.amount > 0)

    const chartData = {
        datasets:[{
            data:filteredCategories.map((c) => c.amount),
            backgroundColor:filteredCategories.map((c) => c.color)
        }],
        labels:filteredCategories.map((c) => c.type)
    }

    console.log({filteredCategories,total,chartData})

    return {filteredCategories,total,chartData}
}

export default useTransactions;