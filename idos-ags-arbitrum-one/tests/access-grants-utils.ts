import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  GrantAdded,
  GrantDeleted
} from "../generated/AccessGrants/AccessGrants"

export function createGrantAddedEvent(
  owner: Address,
  grantee: Address,
  dataId: string,
  lockedUntil: BigInt
): GrantAdded {
  let grantAddedEvent = changetype<GrantAdded>(newMockEvent())

  grantAddedEvent.parameters = new Array()

  grantAddedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  grantAddedEvent.parameters.push(
    new ethereum.EventParam("grantee", ethereum.Value.fromAddress(grantee))
  )
  grantAddedEvent.parameters.push(
    new ethereum.EventParam("dataId", ethereum.Value.fromString(dataId))
  )
  grantAddedEvent.parameters.push(
    new ethereum.EventParam(
      "lockedUntil",
      ethereum.Value.fromUnsignedBigInt(lockedUntil)
    )
  )

  return grantAddedEvent
}

export function createGrantDeletedEvent(
  owner: Address,
  grantee: Address,
  dataId: string,
  lockedUntil: BigInt
): GrantDeleted {
  let grantDeletedEvent = changetype<GrantDeleted>(newMockEvent())

  grantDeletedEvent.parameters = new Array()

  grantDeletedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  grantDeletedEvent.parameters.push(
    new ethereum.EventParam("grantee", ethereum.Value.fromAddress(grantee))
  )
  grantDeletedEvent.parameters.push(
    new ethereum.EventParam("dataId", ethereum.Value.fromString(dataId))
  )
  grantDeletedEvent.parameters.push(
    new ethereum.EventParam(
      "lockedUntil",
      ethereum.Value.fromUnsignedBigInt(lockedUntil)
    )
  )

  return grantDeletedEvent
}
