import { defineField, defineType } from "sanity";
import {HomeIcon} from "@sanity/icons"

export const addressType = defineType({
    name:"address",
    title:"Addresses",
    type:"document",
    icon:HomeIcon,
    fields:[
        defineField({
            name:"name",
            title:"Address Name",
            type:"string",
            description:"A friendly name for this address (e.g. Home, Work)",
            validation:(Rule)=>Rule.required().max(50),
        }),
        defineField({
            name:"email",
            title:"User Email",
            type:"email"
        }),
        defineField({
            name:"address",
            title:"Street Address",
            type:"string",
            description:"The street address including apartment/unit number",
            validation: (Rule)=>Rule.required().min(5).max(50)
        }),
        defineField({
            name:"city",
            title:"City",
            type:"string",
            validation: (Rule)=>Rule.required(),
        }),
        defineField({
            name:"state",
            title:"State",
            type:"string",
            description:"State Name",
            validation:(Rule)=>Rule.required(),
        }),
        defineField({
            name:"zip",
            title:"ZIP Code",
            type:"string",
            description:"Zip Code",
            validation:(Rule)=>Rule.required().regex(/^\d{5}(-\d{4})?$/,{
                name:"zipcode",
                invert:false,
            })
            .custom((zip:string | undefined)=>{
                if(!zip){
                    return "Zip Code is required";
                }
                if(!zip.match(/^\d{5}(-\d{4})?$/)){
                    return "Please enter a valid ZIP Code";
                }
                return true
            }),
        }),
        defineField({
           name:"default",
            title:"Default Address",
            type:"boolean",
            description:"Is this the default shipping address?",
            initialValue: false,
        }),
        defineField({
            name:"createdAt",
            title:"Created At",
            type:"datetime",
            initialValue:()=> new Date().toISOString(),
        }),
    ],
    preview:{
        select:{
            title:"name",
            subtitle:"address",
            city:"city",
            state:"state",
            isDefault:"default",
        },
        prepare({title,subtitle,city,state,isDefault}){
            return{
                title:`${title} ${isDefault?"(Default)":""}`,
                subtitle: `${subtitle}, ${city}, ${state}`,
            };
        },
    },
});