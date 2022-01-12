import { makeAutoObservable, runInAction } from 'mobx';
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { ChatComment } from "../common/form/modals/ChatComment";
import { store } from './store';

export default class CommentStore {
    comments: ChatComment[] = [];
    hubConnection:  HubConnection | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    createHubConnection = (acticityId: string) => {
        if(store.activityStore.selectedActivity){ 
            this.hubConnection = new HubConnectionBuilder().withUrl('https://localhost:44319/chat?activityId=' + acticityId, {
                accessTokenFactory: () => store.userStore.user?.token!
            }).withAutomaticReconnect().configureLogging(LogLevel.Information).build();
            this.hubConnection.start().catch(error => console.log(error));
        }
        this.hubConnection?.on('LoadComments', (comments: ChatComment[]) => {
            runInAction(() => {
                comments.forEach(comment => {
                    comment.createAt = new Date(comment.createAt + 'Z');
                })
                this.comments = comments;
            })
        })

        this.hubConnection?.on('ReceiveComment', (comment: ChatComment) => {
            runInAction(() => {
                comment.createAt = new Date(comment.createAt)
                this.comments.unshift(comment);
            });
        })
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connectio : ', error))
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }

    addComment = async (values: any) => {
        values.activityId = store.activityStore.selectedActivity?.id;
        try {
            await this.hubConnection?.invoke('SendComment', values);
        } catch (error) {
            console.log(error);
        }
    }
}