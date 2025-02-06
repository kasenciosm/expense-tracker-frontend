/* eslint-disable react-refresh/only-export-components */

import React, { useContext, useState } from 'react'
import axios from 'axios'


const BASE_URL = "https://expense-tracker-backend-hpys.onrender.com/api/v1/"

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") ? true : false)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    const registerUser = async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}register`, userData)
            setError("");
            console.log("Registro exitoso", response.data)
            return true
        } catch (error) {
            setError(error.response?.data?.message || "Error en el registro")
            return false
        }
    }

    

    const loginUser = async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}login`, userData)
            console.log('datos: ',response)
            if(response.data.token && response.data.user){
                setIsAuthenticated(true)
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('username', response.data.user.username)
                localStorage.setItem('avatar', response.data.user.avatar)
                setError('')
                return true
            }
        } catch (error) {
            setError(error.response?.data?.message || "Error en el inicio de sesion")
            return false
        }
    }


    const logoutUser = async () => {
        setIsAuthenticated(false)
        setUser(null)
        setToken('')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('avatar')
    }

    //calculate incomes
    const addIncome = async (income) => {
       try {
        await axios.post(`${BASE_URL}add-income`, income, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        await getIncomes()
       } catch (error) {
        setError(error.response?.data?.message || 'Error al agregar income')
       }
        getIncomes()
    }
   
    const getIncomes = async () => {
       try {
        const response = await axios.get(`${BASE_URL}get-incomes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setIncomes(response.data)
       } catch (error) {
        setError(error.message)
       }
    }
        
    const deleteIncome = async (id) => {
        try{
            await axios.delete(`${BASE_URL}delete-income/${id}`, {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            getIncomes()
        } catch(error){
            setError(error.response.data.message)
        }
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome += income.amount
        })

        return totalIncome;
    }

    //calculate expense
    const addExpense = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, income, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            await getExpenses()
           } catch (error) {
            setError(error.response?.data?.message || 'Error al agregar income')
           }
            getExpenses()
    }
    
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setExpenses(response.data)
           } catch (error) {
            setError(error.message)
           }
    }
 
    const deleteExpense = async (id) => {
        try{
            await axios.delete(`${BASE_URL}delete-expense/${id}`, {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            getExpenses()
        } catch(error){
            setError(error.response.data.message)
        }
    }
 
    const totalExpenses = () => {
         let totalIncome = 0;
         expenses.forEach((income) =>{
             totalIncome = totalIncome += income.amount
         })
 
         return totalIncome;
    }
     
    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]

        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }

    const transactionStats = () => {
        
        const incomeAmounts = incomes.map(t => t.amount)
        const expenseAmounts = expenses.map(t => t.amount)
        
        return {
            income: {
                max: incomes.length > 0 ? Math.max(...incomeAmounts) : 0,
                min: incomes.length > 0 ? Math.min(...incomeAmounts) : 0
            },
            expense: {
                max: expenses.length > 0 ? Math.max(...expenseAmounts) : 0,
                min: expenses.length > 0 ? Math.min(...expenseAmounts) : 0
            }
        }
        
    }

    return (
        <GlobalContext.Provider value={{
            isAuthenticated,
            user,
            token,
            registerUser,
            loginUser,
            logoutUser,
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            expenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            transactionStats,
            setError,
            error
        }
        }>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}


