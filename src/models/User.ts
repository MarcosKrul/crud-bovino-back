import { 
    Entity, 
    Column, 
    OneToOne,
    JoinColumn,
    PrimaryGeneratedColumn 
} from "typeorm";
import { Exclude } from "class-transformer";
import ForgotPasswd from "./ForgotPasswd";

@Entity("usuarios")
class User {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;
    
    @Column("varchar", { length: 64, nullable: false })
    public name!: string;

    @Column("varchar", { length: 64, nullable: false })
    public email!: string;

    @Exclude()
    @Column("varchar", { length: 255, nullable: false })
    public password!: string;

    @OneToOne(() => ForgotPasswd, { eager: false })
    @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
    public forgotPasswd!: ForgotPasswd;
}

export default User;