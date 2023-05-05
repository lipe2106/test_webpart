import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { IImprovementFormProps } from './IImprovementFormProps';
import { getSP } from '../../../pnpjsConfig';
import {SPFI} from '@pnp/sp/presets/all';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import "@pnp/sp/items/get-all";
import "@pnp/sp/lists/web"
import styles from './ImprovementForm.module.scss';
import {Label} from 'office-ui-fabric-react/lib/Label';
import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {PrimaryButton} from 'office-ui-fabric-react/lib/Button';

const Form = (props:IImprovementFormProps) => {

    const LIST_NAME = "Intranet";
    let _sp: SPFI = getSP(props.context);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [site, setSite] = useState("");
    const [contact, setContact] = useState("");

    const submit = async (e: any) => {
        e.preventDefault();
        console.log("Hej från submit!");
        console.log("Title: " + title);
        console.log("Descr: " + description);
        console.log("Site: " + site);
        console.log("Contact: " + contact);
        await _sp.web.lists.getByTitle(LIST_NAME).items.add({
            Title : title,
            Description: description,
            Site: site,
            Contact: contact
        }).then(i => {
            console.log(i);
        });
        alert("Improvement submitted");
        setTitle("");
        setDescription("");
        setSite("");
        setContact("");
    }

    return(
        <div>
            <h1>Improvement Form</h1>
            <p>Anything on the new intranet in need of an update, part of the page not working or something doesn't feel logical? Please send in an improvement suggestion and we will have a look. Thank you!</p>
            <form>
                <div>
                    <Label>Title</Label>
                    <TextField
                        value={title}
                        id="Title"
                        placeholder='Title of your suggestion'
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                    <p></p>
                </div>
                <div>
                    <Label>Description</Label>
                    <TextField
                        value={description}
                        id="Description"
                        placeholder='Description of the improvement suggestion'
                        multiline
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                    />
                    <p></p>
                </div>
                <div>
                    <Label>Site URL</Label>
                    <TextField
                        value={site}
                        id="Site"
                        placeholder="Site URL to the page that's in need of improvement"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSite(e.target.value)}
                    />
                    <p></p>
                </div>
                <div>
                    <Label>Contact Information</Label>
                    <TextField
                        value={contact}
                        id="Contact"
                        placeholder='Your name or email as contact information if we have further questions'
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setContact(e.target.value)}
                    />
                    <p></p>
                </div>
                <div>
                    <p></p>
                <PrimaryButton className={styles.submitBtn}  onClick={(e) => submit(e)} text="Submit" />
                </div>
            </form>
            
        </div>
    );
}

export default Form




