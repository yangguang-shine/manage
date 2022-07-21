import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './pages/menu/index'
import Upload from './pages/upload/index'
import Shop from './pages/shop/index'
import Category from './pages/shop/category/index'
import Food from './pages/shop/category/food/index'
import Spider from './pages/spider/index'
import Login from './pages/login/index'
import Register from './pages/register/index'
import './style/common.css'
import './style/flex.css'
import './main.css'

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/manage" element={<Menu></Menu>}>
                        <Route path='login' element={<Login></Login>}></Route>
                        <Route path='register' element={<Register></Register>}></Route>
                        <Route path='upload' element={<Upload></Upload>}></Route>
                        <Route path='shop' element={<Shop></Shop>}>
                            <Route path='category' element={<Category></Category>}>
                                <Route path="food" element={<Food></Food>}></Route>
                            </Route>
                        </Route>
                        {/* <Route path='order' element={<Shop></Shop>}>
                        </Route> */}
                    </Route>
                    <Route path="*" element={<Navigate to='/manage/shop' replace></Navigate>} />
                </Routes>
            </BrowserRouter>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));