export function CardBrandStrip() {
  return (
    <>
      <div className="card-strip-wrapper">
        <p className="card-strip-label">Accepted payment methods</p>
        <div className="card-icons" aria-label="Accepted cards">
          <i className="fab fa-cc-mastercard" aria-hidden="true" />
          <i className="fab fa-cc-visa" aria-hidden="true" />
          <i className="fab fa-cc-amex" aria-hidden="true" />
          <i className="fab fa-cc-discover" aria-hidden="true" />
          <i className="fab fa-cc-maestro" aria-hidden="true" />
          <i className="fab fa-cc-jcb" aria-hidden="true" />
          <i className="fab fa-cc-diners-club" aria-hidden="true" />
        </div>
      </div>

      <style jsx>{`
        .card-strip-wrapper {
          margin-top: 1.25rem;
          margin-bottom: 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.9rem;
          padding: 0.7rem 0.75rem;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        }

        .card-strip-label {
          margin: 0;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #475569;
          text-transform: uppercase;
        }

        .card-icons {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          column-gap: 0.25rem;
          row-gap: 0.25rem;
          margin-top: 0.55rem;
        }

        .card-icons :global(i) {
          font-size: 1.72rem;
          margin: 0 0.08rem;
          transition: transform 0.3s;
        }

        .card-icons :global(i:hover) {
          transform: scale(1.1);
        }

        .card-icons :global(.fab.fa-cc-visa) {
          color: #1a1f71;
        }

        .card-icons :global(.fab.fa-cc-mastercard) {
          /* Official Mastercard-style red/orange split */
          background: linear-gradient(90deg, #eb001b 0%, #eb001b 50%, #f79e1b 50%, #f79e1b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .card-icons :global(.fab.fa-cc-amex) {
          color: #0072b8;
        }

        .card-icons :global(.fab.fa-cc-discover) {
          color: #ff9b00;
        }

        .card-icons :global(.fab.fa-cc-maestro) {
          color: #a500b5;
        }

        .card-icons :global(.fab.fa-cc-jcb) {
          color: #5b1b7b;
        }

        .card-icons :global(.fab.fa-cc-diners-club) {
          color: #a81c47;
        }

        @media (min-width: 640px) {
          .card-strip-wrapper {
            padding: 0.75rem 0.9rem;
          }

          .card-icons {
            column-gap: 0.35rem;
          }

          .card-icons :global(i) {
            font-size: 2rem;
            margin: 0 0.15rem;
          }
        }
      `}</style>
    </>
  );
}
