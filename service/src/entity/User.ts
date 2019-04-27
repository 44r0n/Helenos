import { Entity, Column, PrimaryColumn, Generated } from "typeorm";

@Entity()
export default class User {
    @PrimaryColumn()
    @Generated("uuid")
    public Id: string;

    @Column({
        unique: true
    })
    public UserName: string;
    
    @Column()
    public Password: string;
}