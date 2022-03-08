import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import BaseLayout from './pages/index'
import Home from './pages/home/index'
import Shop from './pages/shop/index'
import Category from './pages/shop/category/index'
import FoodInfo from './pages/shop/category/foodInfo/index'
import Spider from './pages/spider/index'
import Login from './pages/login/index'
import './style/common.css'
import './style/flex.css'
window.log = (params) => {
    console.log(params)
}
export default class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <BrowserRouter>
                <BaseLayout>
                    <Switch>
                        <Route path={'/home'} exact={false} component={Home} />
                        <Route path={'/shop/category/foodInfo'} exact={false} component={FoodInfo} />
                        <Route path={'/shop/category'} exact={false} component={Category} />
                        <Route path={'/shop'} exact={false} component={Shop} />
                        <Route path={'/spider'} exact={false} component={Spider} />
                        <Route path={'/login'} exact={false} component={Login} />
                        <Redirect to={'/home'} />
                    </Switch>
                </BaseLayout>
            </BrowserRouter>
        )
    }
}
ReactDOM.render(<App/>, document.getElementById('root'));