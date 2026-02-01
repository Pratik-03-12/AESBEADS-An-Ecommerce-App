import { defineField, defineType } from "sanity";
import {TrolleyIcon} from "@sanity/icons"

export const productType = defineType({
    name:"product",
    title:"Products",
    type:"document",
    icon: TrolleyIcon,
    fields:[
        defineField({
            name:"name",
            title:"Product Name",
            type:"string",
            validation: (Rule)=>Rule.required(),
        }),
        defineField({
            name:"slug",
            title:"Slug",
            type:"slug",
            options:{
                source:"name",
                maxLength: 100
            },
            validation:(Rule)=>Rule.required(),
        }),
        defineField({
            name:"images",
            title:"Product Images",
            type:"array",
            of:[{type:"image",options:{hotspot:true}}],
        }),
        defineField({
            name:"description",
            title:"Description",
            type:"string", 
        }),
        defineField({
            name:"price",
            title:"Price",
            type:"number",
            validation:(Rule)=>Rule.required().min(0),
        }),
        defineField({
            name:"discount",
            title:"Discount Amount",
            type:"number",
            validation:(Rule)=>Rule.required().min(0),
        }),
        defineField({
            name:"categories",
            title:"Categories",
            type:"array",
            of:[{type:"reference",to:{type:"category"}}],
        }),
        defineField({
            name:"stock",
            title:"Stock",
            type:"number",
            validation:(Rule)=>Rule.min(0),
        }),
        defineField({
            name:"status",
            title:"Product Status",
            type:"string",
            options:{
                list:[
                    {title:"new",value:"new"},
                    {title:"Hot",value:"hot"},
                    {title:"Sale",value:"sale"},
                ],
            },
        }),
        defineField({
            name:"variant",
            title:"Product Type",
            type:"string",
            options:{
                list:[
                    {title:"Necklace",value:"necklace"},
                    {title:"Bracelet",value:"bracelet"},
                    {title:"Earring",value:"earring"},
                    {title:"Ring",value:"ring"},
                    {title:"Phone Charm",value:"phone-charm"},
                    {title:"Keychain",value:"keychain"},
                    {title:"Combo",value:"combo"},
                ],
            },
        }),
        defineField({
            name:"isFeatured",
            title:"Featured Product",
            type:"boolean",
            description:"Toggle to Featured on or off",
            initialValue:false,
        }),
        defineField({
            name:"Colours",
            title:"Available Colours",
            type:"array",
            of:[
                {
                    type:"object",
                    fields:[
                        {
                            name:"name",
                            title:"Color name",
                            type:"string"
                        },
                        {
                            name:"hex",
                            title:"Hex Code",
                            type:"string",
                            description:"Hex code  for the colour(e.g. #FF0000)",
                        },

                    ]
                }
            ]
        })
    ],
    preview:{
        select:{
            title:"name",
            media:"images",
            subtitle:"price",
            colours:"Colours"
        },
        prepare(selection){
            const {title, subtitle, media, colours} = selection;
            const image = media && media[0];

            let colourNames = "";
            if(colours && colours.length>0){
                colourNames = colours.map((c: any)=>c?.name).filter(Boolean).join(", ");
            }

            return{
                title:title,
                subtitle:`$${subtitle}${colourNames?" | Colours: "+colourNames:""}`,
                media:image,
                colours
            };
        }
    }
})