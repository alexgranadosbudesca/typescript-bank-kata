import { DomainEvent } from '../../Shared/domain/DomainEvent';

export class AccountCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'account.created';

  constructor({ aggregateId, eventId, occurredOn }: { aggregateId: string; eventId?: string; occurredOn?: Date }) {
    super({
      eventName: AccountCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
  }

  toPrimitives() {
    return {};
  }

  static fromPrimitives(params: { aggregateId: string; eventId: string; occurredOn: Date }): DomainEvent {
    const { aggregateId, occurredOn, eventId } = params;
    return new AccountCreatedDomainEvent({
      aggregateId,
      eventId,
      occurredOn,
    });
  }
}
