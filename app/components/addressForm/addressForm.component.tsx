type AddressFormProps = {
  addressSend: (
    event:
      | {
          type: 'SET_COUNTRY';
          country: string;
        }
      | {
          type: 'SET_CITY';
          city: string;
        }
      | {
          type: 'SET_STREET';
          street: string;
        }
  ) => void;
  addressState: {
    country: string;
    city: string;
    street: string;
  };
  appSend: (event: { type: string }) => void;
};

export const AddressForm = ({ addressSend, addressState, appSend }: AddressFormProps) => {
  const { country, city, street } = addressState;
  const displayCta = country !== '' && city !== '' && street !== '';

  return (
    <div>
      <h2 className='text-xl text-center mb-4'>Shipping Address</h2>
      <form>
        <div className='flex items-center justify-center gap-5 w-full mb-4'>
          <select
            className='border p-1.5 w-full rounded'
            onChange={(event) => addressSend({ type: 'SET_COUNTRY', country: event.target.value })}
          >
            <option value=''>Select country</option>
            <option value='pl'>Poland</option>
            <option value='usa'>United States</option>
          </select>

          <input
            className=' w-full'
            value={addressState.city}
            type='text'
            onChange={(event) => addressSend({ type: 'SET_CITY', city: event.target.value })}
            placeholder='City'
          />
          <input
            className=' w-full'
            value={addressState.street}
            type='text'
            onChange={(event) => addressSend({ type: 'SET_STREET', street: event.target.value })}
            placeholder='Street'
          />
        </div>
      </form>

      {displayCta && (
        <div className='flex flex-col items-end justify-end'>
          <p>Next step: Shipping Address</p>
          <button onClick={() => appSend({ type: 'address' })}>Next</button>
        </div>
      )}
    </div>
  );
};
