import {
  GrantAdded as GrantAddedEvent,
  GrantDeleted as GrantDeletedEvent
} from "../generated/AccessGrants/AccessGrants"
import { GrantAdded, GrantDeleted } from "../generated/schema"
import { Bytes } from '@graphprotocol/graph-ts'

export function handleGrantAdded(event: GrantAddedEvent): void {
  let entity = new GrantAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.grantee = event.params.grantee
  entity.dataId = Bytes.fromHexString(event.params.dataId.toHexString()).toString()
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
  entity.dataId = Bytes.fromHexString(event.params.dataId.toHexString()).toString()
  entity.lockedUntil = event.params.lockedUntil

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
