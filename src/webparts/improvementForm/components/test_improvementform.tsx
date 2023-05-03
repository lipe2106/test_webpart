import * as React from 'react';
import { IImprovementFormProps } from './IImprovementFormProps';
import styles from './ImprovementForm.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export interface IStates {
    Search: any;
    Selected: any;
    Message: any;
}

export default class test_improvementform extends React.Component<IImprovementFormProps, 
IStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            Search: "",
            Selected: "",
            Message: ""
        }

        this.selected = this.selected.bind(this);
        this.search = this.search.bind(this);
        this.onchange = this.onchange.bind(this);
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

    private async search() {
        if(this.state.Search == "") {
            console.log("Du måste skriva något");
            alert("You need to enter text in searchbar to be able to search");
        } else {
            window.open("http://app02.borgwarner.com/ShareDocs/Search/Pages/Docs.aspx?k=" + this.state.Selected + ":" + this.state.Search + "&s=ShareDocs");
        }
    }

    public render(): React.ReactElement<IImprovementFormProps> {
        return(
            <div>
                <form>
                    <fieldset className={styles.searchForm}>
                        <legend>Search in ShareDocs</legend>
                        <div>
                            <div className={styles.gridcontainer}>
                                <TextField
                                    value={this.state.Search}
                                    id="Search"
                                    placeholder='Enter free text or filter search'
                                    onChange={(e) => this.onchange(e)}
                                />
                                <select onChange={(e) => this.selected(e)} className={styles.dropdown}>
                                    <option value="" selected>No Filter</option>
                                    <option id="Author" value="Author">Author</option>
                                    <option id="Company" value="Company">Company</option>
                                    <option id="Customer" value="Customer">Customer</option>
                                    <option id="DlcDocId" value="DlcDocId">Document ID</option>
                                    <option id="FileName" value="FileName">File Name</option>
                                    <option id="IssuedBy" value="IssuedBy">Issued By</option>
                                    <option id="Project" value="Project">Project</option>
                                    <option id="Supplier" value="Supplier">Supplier</option>
                                    <option id="Title" value="Title">Title</option>
                                </select>
                            </div>
                            <PrimaryButton className={styles.searchBtn}  onClick={(e) => this.search()}>
                                <img src={require('../assets/searchIcon.png')} alt="search icon" />
                                Search in ShareDocs
                            </PrimaryButton>
                        </div>
                        <div>
                            <p>{this.state.Message}</p>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}