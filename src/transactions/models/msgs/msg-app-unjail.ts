import { TxMsg } from "./tx-msg"
import { typeGuard, validateAddressHex } from "../../.."

/**
 * Model representing a MsgAppUnjail to unjail an Application in the Pocket Network
 */
export class MsgAppUnjail extends TxMsg {
    public readonly AMINO_KEY: string = "apps/MsgAppUnjail"
    public readonly address: string

    /**
     * 
     * @param address {string} The address of the Application to unjail
     */
    public constructor(address: string) {
        super()
        this.address = address

        const errorOrUndefined = validateAddressHex(this.address)
        if (typeGuard(errorOrUndefined, Error)) {
            throw errorOrUndefined as Error
        }
    }
    
    public toStdSignDocMsgObj(): any {
        return {
            type: this.AMINO_KEY,
            value: {
                address: this.address.toLowerCase()
            }
        }
    }
}