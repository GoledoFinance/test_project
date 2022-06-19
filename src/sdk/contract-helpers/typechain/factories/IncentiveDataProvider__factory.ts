/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  IncentiveDataProvider,
  IncentiveDataProviderInterface,
} from "../IncentiveDataProvider";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_incentiveController",
        type: "address",
      },
      {
        internalType: "address",
        name: "_masterChef",
        type: "address",
      },
      {
        internalType: "address",
        name: "_multiFeeDistribution",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "getUserIncentive",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "staked",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimable",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "allocPoint",
            type: "uint256",
          },
        ],
        internalType: "struct IncentiveDataProvider.UserIncentiveData[]",
        name: "_controllerUserData",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "totalAllocPoint",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardsPerSecond",
            type: "uint256",
          },
        ],
        internalType: "struct IncentiveDataProvider.IncentivesData",
        name: "_controllerData",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "staked",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "claimable",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "allocPoint",
            type: "uint256",
          },
        ],
        internalType: "struct IncentiveDataProvider.UserIncentiveData[]",
        name: "_chefUserData",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "totalAllocPoint",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardsPerSecond",
            type: "uint256",
          },
        ],
        internalType: "struct IncentiveDataProvider.IncentivesData",
        name: "_chefData",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "totalBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "unlockedBalance",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "unlockTime",
                type: "uint256",
              },
            ],
            internalType: "struct IMultiFeeDistribution.LockedBalance[]",
            name: "earnedBalances",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "unlockTime",
                type: "uint256",
              },
            ],
            internalType: "struct IMultiFeeDistribution.LockedBalance[]",
            name: "lockedBalances",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct IMultiFeeDistribution.RewardData[]",
            name: "rewards",
            type: "tuple[]",
          },
        ],
        internalType: "struct IncentiveDataProvider.UserStakeData",
        name: "_stakeUserData",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lockedSupply",
            type: "uint256",
          },
        ],
        internalType: "struct IncentiveDataProvider.StakeData",
        name: "_stakeData",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "incentiveController",
    outputs: [
      {
        internalType: "contract IChefIncentivesController",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "masterChef",
    outputs: [
      {
        internalType: "contract IMasterChef",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "multiFeeDistribution",
    outputs: [
      {
        internalType: "contract IMultiFeeDistribution",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200181e3803806200181e833981016040819052620000349162000094565b600080546001600160a01b039485166001600160a01b031991821617909155600180549385169382169390931790925560028054919093169116179055620000dd565b80516001600160a01b03811681146200008f57600080fd5b919050565b600080600060608486031215620000a9578283fd5b620000b48462000077565b9250620000c46020850162000077565b9150620000d46040850162000077565b90509250925092565b61173180620000ed6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806321c74e0814610051578063542b3cb81461007f578063575a86b2146100945780635b9fe37f1461009c575b600080fd5b61006461005f3660046111e0565b6100a4565b60405161007696959493929190611577565b60405180910390f35b610087610498565b6040516100769190611549565b6100876104a7565b6100876104b6565b60606100ae611037565b60606100b8611037565b6100c0611051565b6100c8611037565b6100d1876104c5565b90965094506100df87610997565b600254604051630dd59a7360e31b81529296509094506001600160a01b031690636eacd39890610113908a90600401611549565b60206040518083038186803b15801561012b57600080fd5b505afa15801561013f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061016391906113df565b8252600254604051632f07d61760e11b81526001600160a01b0390911690635e0fac2e90610195908a90600401611549565b60206040518083038186803b1580156101ad57600080fd5b505afa1580156101c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101e591906113df565b6020830152600254604051636f9bcc3b60e11b81526001600160a01b039091169063df3798769061021a908a90600401611549565b60006040518083038186803b15801561023257600080fd5b505afa158015610246573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261026e91908101906113f7565b6040808501919091526002549051630241d3fb60e11b81526001600160a01b039091169150630483a7f6906102a7908a90600401611549565b60006040518083038186803b1580156102bf57600080fd5b505afa1580156102d3573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102fb919081019061143c565b6060860152505060025460405163dc01f60d60e01b81526001600160a01b03909116915063dc01f60d90610333908a90600401611549565b60006040518083038186803b15801561034b57600080fd5b505afa15801561035f573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526103879190810190611218565b6080830152600254604080516318160ddd60e01b815290516001600160a01b03909216916318160ddd91600480820192602092909190829003018186803b1580156103d157600080fd5b505afa1580156103e5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061040991906113df565b81526002546040805163ca5c7b9160e01b815290516001600160a01b039092169163ca5c7b9191600480820192602092909190829003018186803b15801561045057600080fd5b505afa158015610464573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061048891906113df565b6020820152949693955091939092565b6002546001600160a01b031681565b6001546001600160a01b031681565b6000546001600160a01b031681565b60606104cf611037565b60008060009054906101000a90046001600160a01b03166001600160a01b031663081e3eda6040518163ffffffff1660e01b815260040160206040518083038186803b15801561051e57600080fd5b505afa158015610532573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061055691906113df565b905060008054906101000a90046001600160a01b03166001600160a01b031663eacdaabc6040518163ffffffff1660e01b815260040160206040518083038186803b1580156105a457600080fd5b505afa1580156105b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105dc91906113df565b602080840191909152600054604080516317caf6f160e01b815290516001600160a01b03909216926317caf6f192600480840193829003018186803b15801561062457600080fd5b505afa158015610638573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065c91906113df565b82528067ffffffffffffffff8111801561067557600080fd5b506040519080825280602002602001820160405280156106af57816020015b61069c611080565b8152602001906001900390816106945790505b50925060005b81811015610990576106c56110b8565b6106cd611037565b60008054604051634d05d17560e11b81526001600160a01b0390911690639a0ba2ea906106fe908790600401611677565b60206040518083038186803b15801561071657600080fd5b505afa15801561072a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061074e91906111fc565b600054604051639a7b5f1160e01b81529192506001600160a01b031690639a7b5f119061077f908490600401611549565b60a06040518083038186803b15801561079757600080fd5b505afa1580156107ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107cf91906112e9565b600054604051630f208beb60e01b81529194506001600160a01b031690630f208beb906108029084908c9060040161155d565b604080518083038186803b15801561081957600080fd5b505afa15801561082d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061085191906113bd565b91508087858151811061086057fe5b60209081029190910101516001600160a01b039091169052508051865187908590811061088957fe5b6020026020010151604001818152505081600001518684815181106108aa57fe5b6020026020010151602001818152505081602001518684815181106108cb57fe5b60209081029190910101516080015260608201516040830151421180156108f25750825115155b156109365760008660000151846020015188602001518660400151420302028161091857fe5b04905083600001518164e8d4a51000028161092f57fe5b0482019150505b61096a826020015161096464e8d4a5100061095e858760000151610f1190919063ffffffff16565b90610f73565b90610fda565b87858151811061097657fe5b6020908102919091010151606001525050506001016106b5565b5050915091565b60606109a1611037565b6001546040805163040f1f6d60e11b815290516000926001600160a01b03169163081e3eda916004808301926020929190829003018186803b1580156109e657600080fd5b505afa1580156109fa573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a1e91906113df565b9050600160009054906101000a90046001600160a01b03166001600160a01b031663eacdaabc6040518163ffffffff1660e01b815260040160206040518083038186803b158015610a6e57600080fd5b505afa158015610a82573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aa691906113df565b602080840191909152600154604080516317caf6f160e01b815290516001600160a01b03909216926317caf6f192600480840193829003018186803b158015610aee57600080fd5b505afa158015610b02573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b2691906113df565b82528067ffffffffffffffff81118015610b3f57600080fd5b50604051908082528060200260200182016040528015610b7957816020015b610b66611080565b815260200190600190039081610b5e5790505b50925060005b8181101561099057610b8f6110f0565b610b97611037565b600154604051634d05d17560e11b81526000916001600160a01b031690639a0ba2ea90610bc8908790600401611677565b60206040518083038186803b158015610be057600080fd5b505afa158015610bf4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c1891906111fc565b600154604051639a7b5f1160e01b81529192506000916001600160a01b0390911690639a7b5f1190610c4e908590600401611549565b60806040518083038186803b158015610c6657600080fd5b505afa158015610c7a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c9e9190611358565b600154604051630f208beb60e01b81529192506000916001600160a01b0390911690630f208beb90610cd69086908e9060040161155d565b604080518083038186803b158015610ced57600080fd5b505afa158015610d01573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d2591906113bd565b905082898781518110610d3457fe5b60209081029190910101516001600160a01b0391821690526001546040516370a0823160e01b8152858316926370a0823192610d7592911690600401611549565b60206040518083038186803b158015610d8d57600080fd5b505afa158015610da1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dc591906113df565b898781518110610dd157fe5b602002602001015160200181815250505050508060000151868481518110610df557fe5b602002602001015160400181815250508160000151868481518110610e1657fe5b60200260200101516080018181525050600082604001519050826020015142118015610e5a5750868481518110610e4957fe5b602002602001015160200151600014155b15610ec3576000610e78846020015142610fda90919063ffffffff16565b8751855160208a015192935060009284020281610e9157fe5b049050888681518110610ea057fe5b6020026020010151602001518164e8d4a510000281610ebb57fe5b048301925050505b610eeb826020015161096464e8d4a5100061095e858760000151610f1190919063ffffffff16565b878581518110610ef757fe5b602090810291909101015160600152505050600101610b7f565b600082610f2057506000610f6d565b82820282848281610f2d57fe5b0414610f6a5760405162461bcd60e51b81526004018080602001828103825260218152602001806116db6021913960400191505060405180910390fd5b90505b92915050565b6000808211610fc9576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b818381610fd257fe5b049392505050565b600082821115611031576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b604051806040016040528060008152602001600081525090565b6040518060a0016040528060008152602001600081526020016060815260200160608152602001606081525090565b6040518060a0016040528060006001600160a01b03168152602001600081526020016000815260200160008152602001600081525090565b6040518060a001604052806000815260200160008152602001600081526020016000815260200160006001600160a01b031681525090565b604051806080016040528060008152602001600081526020016000815260200160006001600160a01b031681525090565b600082601f830112611131578081fd5b81516020611146611141836116a4565b611680565b82815281810190858301604080860288018501891015611164578687fd5b865b8681101561118a576111788a84611198565b85529385019391810191600101611166565b509198975050505050505050565b6000604082840312156111a9578081fd5b6040516040810181811067ffffffffffffffff821117156111c657fe5b604052825181526020928301519281019290925250919050565b6000602082840312156111f1578081fd5b8135610f6a816116c2565b60006020828403121561120d578081fd5b8151610f6a816116c2565b6000602080838503121561122a578182fd5b825167ffffffffffffffff80821115611241578384fd5b818501915085601f830112611254578384fd5b8151611262611141826116a4565b818152848101908486016040808502870188018b1015611280578889fd5b8896505b848710156112da5780828c03121561129a578889fd5b805181810181811088821117156112ad57fe5b825282516112ba816116c2565b815282890151898201528452600196909601959287019290810190611284565b50909998505050505050505050565b600060a082840312156112fa578081fd5b60405160a0810181811067ffffffffffffffff8211171561131757fe5b806040525082518152602083015160208201526040830151604082015260608301516060820152608083015161134c816116c2565b60808201529392505050565b600060808284031215611369578081fd5b6040516080810181811067ffffffffffffffff8211171561138657fe5b806040525082518152602083015160208201526040830151604082015260608301516113b1816116c2565b60608201529392505050565b6000604082840312156113ce578081fd5b6113d88383611198565b9392505050565b6000602082840312156113f0578081fd5b5051919050565b60008060408385031215611409578081fd5b82519150602083015167ffffffffffffffff811115611426578182fd5b61143285828601611121565b9150509250929050565b60008060008060808587031215611451578182fd5b845193506020850151925060408501519150606085015167ffffffffffffffff81111561147c578182fd5b61148887828801611121565b91505092959194509250565b6000815180845260208085019450808401835b838110156114cd576114ba87835161153a565b60409690960195908201906001016114a7565b509495945050505050565b6000815180845260208085019450808401835b838110156114cd57815180516001600160a01b03168852838101518489015260408082015190890152606080820151908901526080908101519088015260a090960195908201906001016114eb565b80518252602090810151910152565b6001600160a01b0391909116815260200190565b6001600160a01b0392831681529116602082015260400190565b600061012080835261158b8184018a6114d8565b9050602061159b8185018a61153a565b83820360608501526115ad82896114d8565b91506115bc608085018861153a565b83820360c085015285518252808601518183015260408087015160a0828501526115e960a0850182611494565b9050606088015184820360608601526116028282611494565b60808a8101518783039790910196909652855180825290850195850192508691505b8082101561165657825180516001600160a01b0316875285015185870152948301949184019160019190910190611624565b50505050508091505061166c60e083018461153a565b979650505050505050565b90815260200190565b60405181810167ffffffffffffffff8111828210171561169c57fe5b604052919050565b600067ffffffffffffffff8211156116b857fe5b5060209081020190565b6001600160a01b03811681146116d757600080fd5b5056fe536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77a26469706673582212201c70fdcba9fef9f622640e4732a0cfd06b90667612cd940b72fef1a30567179664736f6c63430007060033";

export class IncentiveDataProvider__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _incentiveController: string,
    _masterChef: string,
    _multiFeeDistribution: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<IncentiveDataProvider> {
    return super.deploy(
      _incentiveController,
      _masterChef,
      _multiFeeDistribution,
      overrides || {}
    ) as Promise<IncentiveDataProvider>;
  }
  getDeployTransaction(
    _incentiveController: string,
    _masterChef: string,
    _multiFeeDistribution: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _incentiveController,
      _masterChef,
      _multiFeeDistribution,
      overrides || {}
    );
  }
  attach(address: string): IncentiveDataProvider {
    return super.attach(address) as IncentiveDataProvider;
  }
  connect(signer: Signer): IncentiveDataProvider__factory {
    return super.connect(signer) as IncentiveDataProvider__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): IncentiveDataProviderInterface {
    return new utils.Interface(_abi) as IncentiveDataProviderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IncentiveDataProvider {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IncentiveDataProvider;
  }
}
