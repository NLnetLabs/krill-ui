import React, { FormEvent, useState } from 'react';
import { Aspa } from '../../core/types';
import useNavigation from '../../hooks/useNavigation';
import useTranslations from '../../hooks/useTranslations';

import trash from '../../img/trash.svg?url';
import useVersion from '../../hooks/useVersion';

interface AddProps {
  asMap: Map<string, string>;
  asn: string;
  aspa?: Aspa;
  aspas: Aspa[];
  edit: boolean;
}

export default function AspaAdd({ asMap, asn, aspa, aspas, edit }: AddProps) {
  const t = useTranslations();
  const navigate = useNavigation();
  const [customer, setCustomer] = useState(aspa?.customer.toString() || asn.substring(2));
  const [providers, setProviders] = useState(aspa?.providers.join(", ") || '');

  const [providerNames, setProviderNames] = useState<string[][]>([]);
  const [providersMissing, setProvidersMissing] = useState<string[][]>([]);

  const info = useVersion();

  const id = aspa?.id?.toString() || 'new';
  const params: Record<string, string> = {
    id: id,
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.checkValidity()) {
      navigate({ id, customer, providers }, edit ? "cas.aspas.edit" : "cas.aspas.add_new");
    } else {
      form.reportValidity();
    }
  };

  const analyse = (asns: string[]) => {
    const process = () => {
      setProviderNames(asns.map(asn => [asn, asMap.get(asn) || "Unknown"]));
      fetch(`https://stat.ripe.net/data/asn-neighbours/data.json?sourceapp=krill-${info?.version || "unknown"}&resource=${asn}`)
      .then(res => res.json()).then(data => {
        setProvidersMissing(
          data.data.neighbours
            .filter((x: { [x: string]: string; }) => x["type"] == "left" && !asns.includes("" + x["asn"]))
            .map((x: { [x: string]: string; }) => ["" + x["asn"], asMap.get("" + x["asn"]) || "Unknown"])
          );
      }).catch(reason => {
        alert("Could not analyse: " + reason);
      })
    };

    console.log(asMap.size);

    if (asMap.size === 0) {
      fetch("https://ftp.ripe.net/ripe/asnames/asn.txt")
      .then(res => res.text()).then(asNames => {
        
        asNames.split("\n").forEach(line => {
          let entry = line.split(/\s(.*)/s);
          if (entry.length >= 2) {
            asMap.set(entry[0], entry[1]);
          }
        });

        process();
      }).catch(reason => {
        alert("Could not analyse: " + reason);
      });
    } else {
      process();
    }
  };

  return (
    <div className={edit ? "aspa-card card" : "aspa-card card aspa-new"} >
    <div className='aspa-form'>
      <h3>{asn}</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="customer required">{t.aspas.customer}</label>
          <input
            type="number"
            min="0"
            name="customer"
            onInput={(e) =>
              (e.target as HTMLFormElement).setCustomValidity('')
            }
            onInvalid={(e) =>
              (e.target as HTMLFormElement).setCustomValidity(
                t.aspas.customer_validation_format
              )
            }
            value={asn.substring(2)}
            onChange={(e) => {
              let c = e.target.value;
              setCustomer(c);

              if (!edit && aspas.find(x => x.customer === Number(c))) {
                e.target.setCustomValidity(
                  t.aspas.customer_validation_format
                )              
              }
            }}
            required
            disabled
          />
        </div>
        <div>
          <label htmlFor="providers required">{t.aspas.providers}</label>
          <input
            type="text"
            pattern="^((\d+),\s*)*(\d+)$"
            name="provider"
            onInput={(e) =>
              (e.target as HTMLFormElement).setCustomValidity('')
            }
            onInvalid={(e) =>
              (e.target as HTMLFormElement).setCustomValidity(
                t.aspas.providers_validation_format
              )
            }
            value={providers}
            placeholder="123, 456, 789"
            onChange={(e) => setProviders(e.target.value)}
            required
          />
        </div>
        {providerNames.length > 0 && <div>
            <label>{t.aspas.detected_providers}</label>
            <table className="aspa-table">
              <tbody>
              {providerNames.map(provider => 
                <tr key={provider[0]}>
                  <td><span className="aspa-label">{provider[0]}</span></td>
                  <td>{provider[1]}</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>}
        {providersMissing.length > 0 && <div>
            <label>{t.aspas.providers_missing}</label>
              <table className="aspa-table">
                <tbody>
                {providersMissing.map(provider => 
                  <tr key={provider[0]}>
                    <td><span className="aspa-label">{provider[0]}</span></td>
                    <td>{provider[1]}</td>
                  </tr>
                )}
                </tbody>
              </table>
          </div>}
        <div className="actions">
          {edit && <button type="button" className="button" onClick={() => navigate(params, 'cas.aspas.delete')}>
            <img src={trash} alt='Remove' />
          </button>}
          <button type="submit" className="button">
            {edit ? t.aspas.edit : t.aspas.add}
          </button>
          {providers.length > 0 && 
          <button type="button" className="button outline" onClick={() => analyse(providers.split(",").map(x => x.trim()))}>
            {t.aspas.analyse}
          </button>}
        </div>
      </form>
    </div>
    </div>
  );
}
