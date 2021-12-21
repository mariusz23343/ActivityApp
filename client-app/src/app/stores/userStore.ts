import { history } from './../../index';
import { runInAction } from 'mobx';
import { User, UserFormValues } from './../models/user';
import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { store } from './store';
export default class UserStore {
    user: User | null = null;

    constructor(){
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login= async (creds: UserFormValues) => {
        try{
            const user: User = await agent.Account.login(creds)
            store.commonStore.setToken(user.token);
            runInAction(() =>{
                this.user = user;
            });
            history.push('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/')
    }

    getUser = async () => {
        try{
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: UserFormValues) => {
        try{
            const user: User = await agent.Account.register(creds)
            store.commonStore.setToken(user.token);
            runInAction(() =>{
                this.user = user;
            });
            history.push('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }
}