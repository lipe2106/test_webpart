import * as React from 'react';
import { IImprovementFormProps } from './IImprovementFormProps';
import styles from './ImprovementForm.module.scss';
import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {Label} from 'office-ui-fabric-react/lib/Label';
import {Web} from '@pnp/sp/presets/all';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import "@pnp/sp/items/get-all";
import {PrimaryButton} from 'office-ui-fabric-react/lib/Button';

export interface IStates {
    Title: any;
    Description: any;
    Site: any;
    Contact: any;
    Search: any;
    DlcDocId: any;
    Selected: any;
}

export default class test_improvementform extends React.Component<IImprovementFormProps, 
IStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            Title: "",
            Description: "",
            Site: "",
            Contact: "",
            Search: "",
            DlcDocId: "",
            Selected: ""
        }

        this.onchange = this.onchange.bind(this);
        this.submit = this.submit.bind(this);
    }

    public onchange(e: any) {
        let state : any = {}
        state[e.target.id] = e.target.value;
        this.setState(state);
    }

    public selected(e: any) {
        let state : any = {}
        state["Selected"] = e.target["value"];
        this.setState(state);
    }

    private async submit(e: any) {
        e.preventDefault();
        console.log("Hej från submit!");
        console.log("Titel:" + this.state.Title)
        console.log("Description:" + this.state.Description)
        console.log("Site:" + this.state.Site)
        console.log("Contact:" + this.state.Contact)
        let web = Web(this.props.webURL);
        await web.lists.getByTitle("Intranet Improvements").items.add({
            Title: this.state.Title,
            Description: this.state.Description,
            Site: this.state.Site,
            Contact: this.state.Contact
        }).then(i => {
            console.log(i);
        });
        alert("Improvement submitted");
        this.setState({Title:"", Description:"", Site: "", Contact: ""});
    }

    private async get(e: any){
        e.preventDefault();
        console.log("Hej från getAll");
        let web = Web(this.props.webURL);
        await web.lists.getByTitle("Intranet Improvements").items.getAll().then((response: any) => {
            console.log(response);
        
    })}

    private async redirect() {
        window.open("http://app02.borgwarner.com/ShareDocs/Search/Pages/Docs.aspx?k=" + this.state.Selected + ":" + this.state.Search + "&s=ShareDocs");
    }

    public render(): React.ReactElement<IImprovementFormProps> {
        return(
            <div>
                <h1>Test Improvement Form</h1>
                <p>Anything on the new intranet in need of an update, part of the page not working or something doesn't feel logical? Please send in an improvement suggestion and we will have a look. Thank you!</p>
                <form>
                    <div>
                        <Label>Title</Label>
                        <TextField
                            value={this.state.Title}
                            id="Title"
                            placeholder='Title of your suggestion'
                           onChange={this.onchange}
                        />
                        <p></p>
                    </div>
                    <div>
                        <Label>Description</Label>
                        <TextField
                            value={this.state.Description}
                            id="Description"
                            placeholder='Description of the improvement suggestion'
                            multiline
                            onChange={(e) => this.onchange(e)}
                        />
                        <p></p>
                    </div>
                    <div>
                        <Label>Site URL</Label>
                        <TextField
                            value={this.state.Site}
                            id="Site"
                            placeholder="Site URL to the page that's in need of improvement"
                            onChange={(e) => this.onchange(e)}
                        />
                        <p></p>
                    </div>
                    <div>
                        <Label>Contact Information</Label>
                        <TextField
                            value={this.state.Contact}
                            id="Contact"
                            placeholder='Your name or email as contact information if we have further questions'
                            onChange={(e) => this.onchange(e)}
                        />
                        <p></p>
                    </div>
                    <div>
                        <p></p>
                        <PrimaryButton className={styles.submitBtn}  onClick={(e) => this.submit(e)} text="Submit" />
                    </div>
                    <div>
                        <p></p>
                        <PrimaryButton className={styles.submitBtn}  onClick={(e) => this.get(e)} text="Get" />
                    </div>
                    <div>
                        <p></p>
                        <Label>Search</Label>
                        <select onChange={(e) => this.selected(e)}>
                            <option id="DlcDocId" value="DlcDocId">Document ID</option>
                            <option id="Title" value="Title">Title</option>
                        </select>
                        <TextField
                            value={this.state.Search}
                            id="Search"
                            placeholder='Search'
                            onChange={(e) => this.onchange(e)}
                        />
                        <PrimaryButton className={styles.submitBtn}  onClick={(e) => this.redirect()} text="Redirect" />
                    </div>
                    <div>
                        <p>Here will the message appear</p>
                    </div>
                </form>
                
            </div>
        );
    }
}