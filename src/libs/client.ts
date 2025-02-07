import { fetchData } from '@/libs';
import { DEFAULT } from '@/libs';
import {
  adapter,
  withCustomAdapter,
  type Request,
  type RequestRegistry,
  type Registry,
  type AbstractRegistry,
} from './registry';

export class BaseRestClient<R extends AbstractRegistry> {
  endpoint: string;
  registry: R;
  constructor(endpoint: string, registry: R) {
    this.endpoint = endpoint;
    this.registry = registry;
  }
  async request<T>(request: Request<T>, args: Record<string, any>, query = '') {
    let url = `${this.endpoint}${request.url}${query}`;
    Object.keys(args).forEach((k) => {
      url = url.replace(`{${k}}`, args[k] || '');
    });
    return fetchData<T>(url, adapter);
  }
}

export class CosmosRestClient extends BaseRestClient<RequestRegistry> {
  static newDefault(endpoint: string) {
    return new CosmosRestClient(endpoint, DEFAULT)
  }
  // Auth Module
  async getAuthAccounts() {
    return this.request(this.registry.auth_accounts, {});
  }
  async getAuthAccount(address: string) {
    return this.request(this.registry.auth_account_address, { address });
  }
  // Bank Module
  async getBankParams() {
    return this.request(this.registry.bank_params, {});
  }
  async getBankBalances(address: string) {
    return this.request(this.registry.bank_balances_address, { address });
  }
  async getBankDenomMetadata() {
    return this.request(this.registry.bank_denoms_metadata, {});
  }
  async getBankSupply() {
    return this.request(this.registry.bank_supply, {});
  }
  async getBankSupplyByDenom(denom: string) {
    return this.request(this.registry.bank_supply_by_denom, { denom });
  }
  // Distribution Module
  async getDistributionParams() {
    return this.request(this.registry.distribution_params, {});
  }
  async getDistributionCommunityPool() {
    return this.request(this.registry.distribution_community_pool, {});
  }
  async getDistributionDelegatorRewards(delegator_addr: string) {
    return this.request(this.registry.distribution_delegator_rewards, {
      delegator_addr,
    });
  }
  async getDistributionValidatorCommission(validator_address: string) {
    return this.request(this.registry.distribution_validator_commission, {
      validator_address,
    });
  }
  async getDistributionValidatorOutstandingRewards(validator_address: string) {
    return this.request(
      this.registry.distribution_validator_outstanding_rewards,
      { validator_address }
    );
  }
  async getDistributionValidatorSlashes(validator_address: string) {
    return this.request(this.registry.distribution_validator_slashes, {
      validator_address,
    });
  }
  // Slashing
  async getSlashingParams() {
    return this.request(this.registry.slashing_params, {});
  }
  async getSlashingSigningInfos() {
    const query = '?pagination.limit=300';
    return this.request(this.registry.slashing_signing_info, {}, query);
  }
  // Gov
  async getGovParamsVoting() {
    return this.request(this.registry.gov_params_voting, {});
  }
  async getGovParamsDeposit() {
    return this.request(this.registry.gov_params_deposit, {});
  }
  async getGovParamsTally() {
    return this.request(this.registry.gov_params_tally, {});
  }
  async getGovProposals(status: string, limit = 20) {
    const query =
      '?proposal_status={status}&pagination.limit={limit}&pagination.reverse=true&pagination.key=';
    return this.request(this.registry.gov_proposals, { status, limit }, query);
  }
  async getGovProposal(proposal_id: string) {
    return this.request(this.registry.gov_proposals_proposal_id, {
      proposal_id,
    });
  }
  async getGovProposalDeposits(proposal_id: string) {
    return this.request(this.registry.gov_proposals_deposits, { proposal_id });
  }
  async getGovProposalTally(proposal_id: string) {
    return this.request(this.registry.gov_proposals_tally, { proposal_id });
  }
  async getGovProposalVotes(proposal_id: string, next_key?: string) {
    return this.request(this.registry.gov_proposals_votes, {
      proposal_id,
      next_key,
    });
  }
  async getGovProposalVotesVoter(proposal_id: string, voter: string) {
    return this.request(this.registry.gov_proposals_votes_voter, {
      proposal_id,
      voter,
    });
  }
  // staking
  async getStakingDelegations(delegator_addr: string) {
    return this.request(this.registry.staking_deletations, { delegator_addr });
  }
  async getStakingDelegatorRedelegations(delegator_addr: string) {
    return this.request(this.registry.staking_delegator_redelegations, {
      delegator_addr,
    });
  }
  async getStakingDelegatorUnbonding(delegator_addr: string) {
    return this.request(this.registry.staking_delegator_unbonding_delegations, {
      delegator_addr,
    });
  }
  async getStakingDelegatorValidators(delegator_addr: string) {
    return this.request(this.registry.staking_delegator_validators, {
      delegator_addr,
    });
  }
  async getStakingParams() {
    return this.request(this.registry.staking_params, {});
  }
  async getStakingPool() {
    return this.request(this.registry.staking_pool, {});
  }
  async getStakingValidators(status: string, limit = 200) {
    return this.request(this.registry.staking_validators, { status, limit });
  }
  async getStakingValidator(validator_addr: string) {
    return this.request(this.registry.staking_validators_address, {
      validator_addr,
    });
  }
  async getStakingValidatorsDelegations(validator_addr: string) {
    return this.request(this.registry.staking_validators_delegations, {
      validator_addr,
    });
  }
  async getStakingValidatorsDelegationsDelegator(
    validator_addr: string,
    delegator_addr: string
  ) {
    return this.request(
      this.registry.staking_validators_delegations_delegator,
      { validator_addr, delegator_addr }
    );
  }
  async getStakingValidatorsDelegationsUnbonding(
    validator_addr: string,
    delegator_addr: string
  ) {
    return this.request(
      this.registry.staking_validators_delegations_unbonding_delegations,
      { validator_addr, delegator_addr }
    );
  }

  //tendermint
  async getBaseAbciQuery() {
    return this.request(this.registry.base_tendermint_abci_query, {});
  }
  async getBaseBlockLatest() {
    return this.request(this.registry.base_tendermint_block_latest, {});
  }
  async getBaseBlockAt(height: string | number) {
    return this.request(this.registry.base_tendermint_block_height, { height });
  }
  async getBaseNodeInfo() {
    return this.request(this.registry.base_tendermint_node_info, {});
  }
  async getBaseValidatorsetAt(height: string | number, offset: number) {
    console.log("offset", offset)
    const query = `?pagination.limit=100&pagination.offset=${offset}`
    return this.request(this.registry.base_tendermint_validatorsets_height, {
      height,
    }, query);
  }
  async getBaseValidatorsetLatest(offset: number) {
    console.log(offset)
    const query = `?pagination.limit=100&pagination.offset=${offset}`
    return this.request(this.registry.base_tendermint_validatorsets_latest, {}, query);
  }
  // tx
  async getTxsBySender(sender: string) {
    const query = `?pagination.reverse=true&events=message.sender='${sender}'`;
    return this.request(this.registry.tx_txs, {}, query);
  }
  async getTxsAt(height: string | number) {
    return this.request(this.registry.tx_txs_block, { height });
  }
  async getTx(hash: string) {
    return this.request(this.registry.tx_hash, { hash });
  }

  // mint
  async getMintParam() {
    return this.request(this.registry.mint_params, {});
  }
  async getMintInflation() {
    return this.request(this.registry.mint_inflation, {});
  }
  async getMintAnnualProvisions() {
    return this.request(this.registry.mint_annual_provisions, {});
  }

  // ibc
  async getIBCAppTransferDenom(hash: string) {
    return this.request(this.registry.ibc_app_transfer_denom_traces_hash, {
      hash,
    });
  }
  async getIBCConnections() {
    return this.request(this.registry.ibc_core_connection_connections, {});
  }
  async getIBCConnectionsById(connection_id: string) {
    return this.request(
      this.registry.ibc_core_connection_connections_connection_id,
      { connection_id }
    );
  }
  async getIBCConnectionsClientState(connection_id: string) {
    return this.request(
      this.registry.ibc_core_connection_connections_connection_id_client_state,
      { connection_id }
    );
  }
  async getIBCConnectionsChannels(connection_id: string) {
    return this.request(this.registry.ibc_core_channel_connections_channels, {
      connection_id,
    });
  }
  async getIBCChannels() {
    return this.request(this.registry.ibc_core_channel_channels, {});
  }
  async getIBCChannelAcknowledgements(channel_id: string, port_id: string) {
    return this.request(
      this.registry.ibc_core_channel_channels_acknowledgements,
      { channel_id, port_id }
    );
  }
  async getIBCChannelNextSequence(channel_id: string, port_id: string) {
    return this.request(this.registry.ibc_core_channel_channels_next_sequence, {
      channel_id,
      port_id,
    });
  }
}
