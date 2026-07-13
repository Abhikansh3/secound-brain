import mongoose from 'mongoose';
export declare const UserModel: mongoose.Model<{
    username?: string | null;
    password?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    username?: string | null;
    password?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    username?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    username?: string | null;
    password?: string | null;
}, mongoose.Document<unknown, {}, {
    username?: string | null;
    password?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    username?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    username?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    username?: string | null;
    password?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ContentModel: mongoose.Model<{
    tags: mongoose.Types.ObjectId[];
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    tags: mongoose.Types.ObjectId[];
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    tags: mongoose.Types.ObjectId[];
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    tags: mongoose.Types.ObjectId[];
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
}, mongoose.Document<unknown, {}, {
    tags: mongoose.Types.ObjectId[];
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    tags: mongoose.Types.ObjectId[];
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    tags: mongoose.Types.ObjectId[];
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    tags: mongoose.Types.ObjectId[];
    title?: string | null;
    link?: string | null;
    userId?: mongoose.Types.ObjectId | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const LinkModel: mongoose.Model<{
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
}, mongoose.Document<unknown, {}, {
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userId?: mongoose.Types.ObjectId | null;
    hash?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=db.d.ts.map