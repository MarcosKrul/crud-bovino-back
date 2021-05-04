import { 
    Entity, 
    Column, 
    OneToOne,
    JoinColumn,
    PrimaryColumn 
} from "typeorm";
import User from "./User";

@Entity("forgot_passwd")
class ForgotPasswd {
    @PrimaryColumn("uuid")
    public user_id!: string;
    
    @Column("varchar", { length: 40, nullable: false })
    public token!: string;

    @Column("timestamp", { nullable: false })
    public expiresIn!: Date;

    @OneToOne(() => User, { eager: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    public user!: User;
}

export default ForgotPasswd;