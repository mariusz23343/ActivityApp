import { UserFormValues } from './../models/user';
import { store } from './../stores/store';
import { history } from './../../index';
import { Activity } from './../models/activity';
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from 'react-toastify';
import { User } from '../models/user';


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    }); 
}

axios.defaults.baseURL = 'https://localhost:44319/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response =>{

        await sleep(1000);
        return response;
    },    (error: AxiosError) => {
       const{data, status, config} = error.response!;
       switch(status){
           case 400: 
           if (typeof data === 'string') {
               toast.error(data)
           }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                history.push('/not-found')
            }
                if(data.errors){
                    const modalStateErrors = [];
                    for(const key in data.errors){
                        if(data.errors[key]){
                            modalStateErrors.push(data.errors[key])
                        }
                    } 
                    throw modalStateErrors.flat();
                } 
                break;
           case 401:
                toast.error('unauthorised');
                break;
           case 404:
                history.push('/not-found')
               break;
           case 500: 
                store.commonStore.setServerError(data);
                history.push('/server-error')
                break;              
       }
    })

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details : (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => axios.post<void>('activities', activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`)
}

const Account ={
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)

}

const agent = {
    Activities,
    Account
}

export default agent;
