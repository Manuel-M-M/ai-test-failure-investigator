import { useEffect, useState } from "react";
import { getHistory } from "../../services/history";
import type { InvestigationHistoryItem } from "../../types/investigation";
import "./RecentInvestigations.css";

interface Props {
  onSelect: (item: InvestigationHistoryItem) => void;
}

export default function RecentInvestigations({ onSelect }: Props) {
  const [items, setItems] = useState<InvestigationHistoryItem[]>([]);

  useEffect(() => {
    setItems(getHistory());
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="history">
      <h3>Recent investigations</h3>

      <div className="history-list">
        {items.map((item) => (
          <button
            key={item.id}
            className="history-item"
            onClick={() => onSelect(item)}
          >
            <p className="history-framework">{item.input.framework}</p>

            <p className="history-snippet">
              {item.input.errorLog.slice(0, 120)}...
            </p>

            <p className="history-date">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
