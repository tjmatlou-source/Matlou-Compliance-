#!/usr/bin/env python3
"""Matlou Compliance Consulting — KPI Dashboard"""

import json
import subprocess
from flask import Flask, render_template

app = Flask(__name__)

def db_query(sql):
    """Run a team-db query and return JSON results."""
    result = subprocess.run(["team-db", sql], capture_output=True, text=True, timeout=10)
    return json.loads(result.stdout)

@app.route("/")
def dashboard():
    # Active clients
    clients = db_query("SELECT * FROM clients ORDER BY start_date DESC")
    active_clients = [c for c in clients if c["status"] == "active"]

    # Engagements
    engagements = db_query(
        "SELECT e.*, c.name AS client_name, c.type AS client_type "
        "FROM engagements e JOIN clients c ON e.client_id = c.id "
        "ORDER BY e.start_date DESC"
    )

    # MRR — sum of monthly retainers (Gold=R7500, Silver=R3500)
    retainer_clients = [c for c in clients if c.get("retainer_tier")]
    mrr = 0
    for c in retainer_clients:
        if c["retainer_tier"] == "Gold":
            mrr += 7500
        elif c["retainer_tier"] == "Silver":
            mrr += 3500

    # Clients by type
    by_type = {}
    for c in clients:
        t = c["type"]
        by_type[t] = by_type.get(t, 0) + 1

    # Total project revenue (one-off engagements)
    project_revenue = sum(e["fee"] for e in engagements if not e["is_recurring"])

    # Conversion rate: clients with engagements that started as projects -> retainers
    project_clients = set()
    retainer_clients_set = set()
    for e in engagements:
        if not e["is_recurring"]:
            project_clients.add(e["client_id"])
        else:
            retainer_clients_set.add(e["client_id"])
    converted = project_clients & retainer_clients_set
    conversion_rate = round(len(converted) / len(project_clients) * 100) if project_clients else 0

    return render_template(
        "index.html",
        clients=clients,
        active_count=len(active_clients),
        mrr=mrr,
        project_revenue=project_revenue,
        conversion_rate=conversion_rate,
        by_type=by_type,
        engagements=engagements,
        retainer_count=len(retainer_clients),
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)