import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { GrantAdded } from "../generated/schema"
import { GrantAdded as GrantAddedEvent } from "../generated/AccessGrants/AccessGrants"
import { handleGrantAdded } from "../src/access-grants"
import { createGrantAddedEvent } from "./access-grants-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let grantee = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let dataId = "Example string value"
    let lockedUntil = BigInt.fromI32(234)
    let newGrantAddedEvent = createGrantAddedEvent(
      owner,
      grantee,
      dataId,
      lockedUntil
    )
    handleGrantAdded(newGrantAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("GrantAdded created and stored", () => {
    assert.entityCount("GrantAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "GrantAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "GrantAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "grantee",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "GrantAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "dataId",
      "Example string value"
    )
    assert.fieldEquals(
      "GrantAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "lockedUntil",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
