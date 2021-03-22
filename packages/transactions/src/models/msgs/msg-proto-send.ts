import { Any } from './../../../../../dist/transactions/models/proto/generated/google/protobuf/any.d';
import { TxMsg } from "./tx-msg"

/**
 * Model representing a MsgSend to send POKT from one account to another
 */
export class MsgProtoSend extends TxMsg {
    public readonly fromAddress: string
    public readonly toAddress: string
    public readonly amount: string
    public readonly KEY: string = "github.com/pokt-network/pocket-core/x/nodes/types.MsgSend"

    /**
     * Constructor this message
     * @param {string} fromAddress - Origin address
     * @param {string} toAddress - Destination address
     * @param {string} amount - Amount to be sent, needs to be a valid number greater than 0
     * @param {CoinDenom | undefined} amountDenom  - Amount value denomination
     */
    public constructor(fromAddress: string, toAddress: string, amount: string) {
        super()
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
        const amountNumber = Number(this.amount) || -1
        if (isNaN(amountNumber)) {
            throw new Error("Fee is not a valid number")
        } else if (amountNumber < 0) {
            throw new Error("Amount < 0")
        }
    }
    /**
     * Converts an Msg Object to StdSignDoc
     * @returns {any} - Msg type key value.
     * @memberof MsgSend
     */
    public toStdSignDocMsgObj(): any {
        return Any.fromJSON({
            "@type": this.KEY,
            "fromAddress": {
                "@type": "github.com/pokt-network/pocket-core/types.Address",
                "value": this.fromAddress.toLowerCase()
            },
            "toAddress": {
                "@type": "github.com/pokt-network/pocket-core/types.Address",
                "value": this.toAddress.toLowerCase()
            },
            "value": {
                "@type": "github.com/pokt-network/pocket-core/types.BigInt",
                "value": this.amount
            }
        });
    }

    /**
     * Converts an Msg Object to StdSignDoc
     * @returns {any} - Msg type key value.
     * @memberof MsgSend
     */
    public toStdTxMsgObj(): any {
        return this.toStdSignDocMsgObj()
    }
}