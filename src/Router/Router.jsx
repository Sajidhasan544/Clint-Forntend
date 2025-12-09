import React from 'react';
import { createBrowserRouter } from 'react-router';
import Layouts from '../Layouts/Layouts';
import Home from '../Pages/Home';
import Login from '../Pages/Login/Login';
import ProctedRouter from './ProctedRouter';
import CTable from '../Pages/Coustomar/CTable';
import Details from '../Pages/Coustomar/Details';
import AddClintInfo from '../Pages/Coustomar/AddClintInfo';

const Router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: (
            <ProctedRouter>
                <Layouts />
            </ProctedRouter>
        ),
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/table',
                element: (
                    <ProctedRouter>
                        <CTable></CTable>
                    </ProctedRouter>
                )
            },
            {
                path: '/details/:id',
                element: (
                    <ProctedRouter>
                        <Details/>
                    </ProctedRouter>
                )
            },
            {
                path:'/add',
                element:(
                    <ProctedRouter>
                        <AddClintInfo></AddClintInfo>
                    </ProctedRouter>
                )
            }
        ]
    }
]);

export default Router;
