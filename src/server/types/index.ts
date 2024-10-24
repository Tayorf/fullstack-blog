export interface authors{
    id:number;
    created_at:Date;
     name: string;
     email:string;
};

export interface blogs{
    id:number;
    created_at:Date;
     author_id:number
     title:string;
     content:string;
};

export interface tags{
    id:number;
    name: string;
};

export interface blogtags{
    blog_id:number;
    tag_id:number;
};