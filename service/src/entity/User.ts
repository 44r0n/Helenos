import { Entity, Column, PrimaryColumn, Generated, BeforeInsert } from "typeorm";
import * as bcrypt from "bcryptjs";

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

    @BeforeInsert()
    public EncriptPassword(): void {
        this.Password = bcrypt.hashSync(this.Password, 10);
    }

    public async ComparePassword(candidatePassword: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(candidatePassword, this.Password, (err, success) => {
                if(err) { return reject(err); }
                return resolve(success);
            });
        });
    }
}