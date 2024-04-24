import {
  GrantAdded as GrantAddedEvent,
  GrantDeleted as GrantDeletedEvent
} from "../generated/AccessGrants/AccessGrants"
import { GrantAdded, GrantDeleted } from "../generated/schema"
import { ByteArray, Bytes, ethereum } from '@graphprotocol/graph-ts'

export function handleGrantAdded(event: GrantAddedEvent): void {
  // https://medium.com/coinmonks/7-key-insights-for-smart-contract-developers-what-weve-learned-building-splice-995dbb7bc2d6
  const methodBytes = event.transaction.input.subarray(0,4);
  const methodHex = Bytes.fromUint8Array(methodBytes).toHexString();
  const functionInput = event.transaction.input.subarray(4);
  const tuplePrefix = ByteArray.fromHexString("0x0000000000000000000000000000000000000000000000000000000000000020");
  const functionInputAsTuple = new Uint8Array(tuplePrefix.length + functionInput.length);
  functionInputAsTuple.set(tuplePrefix, 0);
  functionInputAsTuple.set(functionInput, tuplePrefix.length);
  const tupleInputBytes = Bytes.fromUint8Array(functionInputAsTuple);

  let entity = new GrantAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  if (methodHex == "0xb14d52d5") {
    const decoded = ethereum.decode(
      '(address,string,uint256)',
      tupleInputBytes
    ) as ethereum.Value;
    entity.dataId = decoded.toTuple()[1].toString();
  } else if (methodHex == "0x4ba0b062") {
    const decoded = ethereum.decode(
      '(address,address,string,uint256,bytes)',
      tupleInputBytes
    ) as ethereum.Value;
    entity.dataId = decoded.toTuple()[2].toString();
  }

  entity.owner = event.params.owner
  entity.grantee = event.params.grantee
  entity.lockedUntil = event.params.lockedUntil

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGrantDeleted(event: GrantDeletedEvent): void {
  let entity = new GrantDeleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.grantee = event.params.grantee
  entity.dataId = "not implemented"
  entity.lockedUntil = event.params.lockedUntil

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
