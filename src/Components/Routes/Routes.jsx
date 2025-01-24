import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../../App/App';
import AddRecipe from '../AddRecipe';
import RecipeList from '../RecipeList';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />
        },
        {
            path: '/Add Recipe/:id',
            element: <AddRecipe />
        },
        {
            path: '/RecipeList',
            element: <RecipeList />
        }
    ],
    {
        basename: '/Recipe_App' 
    }
);

const RouterWrapper = () => {
    return (
        <RouterProvider router={router}>
            <div>Loading...</div>
        </RouterProvider>
    );
};

export default RouterWrapper;
