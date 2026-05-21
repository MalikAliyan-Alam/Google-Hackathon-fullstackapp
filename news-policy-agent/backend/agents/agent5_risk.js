const agent5_risk = async (agent2Output, agent3Output, agent4Output) => {
  console.log('[Agent 5 - Risk] ✓ Received data from all previous agents');
  console.log('[Agent 5 - Risk] ✓ Performing comprehensive risk assessment...');

  await new Promise(resolve => setTimeout(resolve, 1000));

  const severity = agent2Output.severity;
  const urgency = agent2Output.urgency;
  const sectors = agent2Output.affected_sectors || [];
  const insight = agent2Output.core_insight || '';
  const economicImpact = agent2Output.economic_impact || '';

  // Calculate risk score (0-100)
  let riskScore = 0;

  // Severity contribution (0-40)
  if (severity === 'high') riskScore += 40;
  else if (severity === 'medium') riskScore += 25;
  else riskScore += 10;

  // Urgency contribution (0-30)
  if (urgency === 'immediate') riskScore += 30;
  else if (urgency === 'short-term') riskScore += 20;
  else riskScore += 10;

  // Sectors affected contribution (0-20)
  riskScore += Math.min(sectors.length * 5, 20);

  // Keyword risk contribution (0-10)
  const highRiskWords = ['critical', 'collapse', 'failure', 'crisis', 'emergency', 'severe', 'catastrophic', 'immediate', 'danger', 'threat'];
  const insightLower = insight.toLowerCase();
  const keywordMatches = highRiskWords.filter(w => insightLower.includes(w)).length;
  riskScore += Math.min(keywordMatches * 3, 10);

  // Cap at 100
  riskScore = Math.min(riskScore, 100);

  // Risk level label
  const riskLevel = riskScore >= 70 ? 'CRITICAL' : riskScore >= 50 ? 'HIGH' : riskScore >= 30 ? 'MODERATE' : 'LOW';
  const riskColor = riskScore >= 70 ? '#E74C3C' : riskScore >= 50 ? '#F39C12' : riskScore >= 30 ? '#3498DB' : '#27AE60';

  // Dynamic risk factors based on content
  const getRiskFactors = (sectors, insight, severity) => {
    const factors = [];
    const t = (sectors.join(' ') + ' ' + insight).toLowerCase();

    if (t.includes('transport') || t.includes('logistics') || t.includes('fuel')) {
      factors.push({ factor: 'Supply Chain Disruption', level: 'HIGH', desc: 'Transport network vulnerability may cascade to delivery failures' });
      factors.push({ factor: 'Cost Inflation Risk', level: 'HIGH', desc: 'Rising operational costs threaten business sustainability' });
    }
    if (t.includes('health') || t.includes('medical') || t.includes('patient')) {
      factors.push({ factor: 'Patient Safety Risk', level: 'CRITICAL', desc: 'Healthcare service gaps directly endanger patient wellbeing' });
      factors.push({ factor: 'Revenue Sustainability', level: 'MODERATE', desc: 'Declining patient numbers threaten clinic financial stability' });
    }
    if (t.includes('business') || t.includes('sales') || t.includes('revenue')) {
      factors.push({ factor: 'Revenue Decline Risk', level: 'HIGH', desc: 'Continued sales decline threatens business viability' });
      factors.push({ factor: 'Market Share Loss', level: 'HIGH', desc: 'Competitors may capture lost customers permanently' });
    }
    if (t.includes('policy') || t.includes('government') || t.includes('regulation')) {
      factors.push({ factor: 'Compliance Risk', level: 'HIGH', desc: 'Non-compliance with new regulations may result in penalties' });
      factors.push({ factor: 'Institutional Reputation', level: 'MODERATE', desc: 'Delayed response may damage public trust and credibility' });
    }
    if (t.includes('disaster') || t.includes('flood') || t.includes('emergency')) {
      factors.push({ factor: 'Human Life Risk', level: 'CRITICAL', desc: 'Direct threat to human safety requires immediate intervention' });
      factors.push({ factor: 'Infrastructure Damage', level: 'CRITICAL', desc: 'Physical infrastructure destruction has long-term recovery implications' });
    }
    if (t.includes('finance') || t.includes('economy') || t.includes('inflation')) {
      factors.push({ factor: 'Economic Instability', level: 'HIGH', desc: 'Financial disruption may trigger broader economic consequences' });
      factors.push({ factor: 'Investment Climate Risk', level: 'MODERATE', desc: 'Uncertainty may deter foreign and domestic investment' });
    }

    // Always add these general factors
    factors.push({ factor: 'Stakeholder Confidence', level: severity === 'high' ? 'HIGH' : 'MODERATE', desc: 'Delayed action erodes trust among key stakeholders' });
    factors.push({ factor: 'Escalation Risk', level: urgency === 'immediate' ? 'HIGH' : 'MODERATE', desc: 'Unaddressed issues tend to compound and worsen over time' });

    return factors.slice(0, 4);
  };

  // Dynamic mitigation strategies
  const getMitigations = (sectors, insight) => {
    const t = (sectors.join(' ') + ' ' + insight).toLowerCase();
    const mitigations = [];

    if (t.includes('transport') || t.includes('fuel') || t.includes('logistics')) {
      mitigations.push({ strategy: 'Activate Contingency Pricing', priority: 'IMMEDIATE', desc: 'Implement pre-approved pricing adjustments to offset cost increases' });
      mitigations.push({ strategy: 'Diversify Supply Chain', priority: 'SHORT-TERM', desc: 'Identify and onboard alternative suppliers to reduce dependency' });
    } else if (t.includes('health') || t.includes('medical')) {
      mitigations.push({ strategy: 'Launch Digital Marketing', priority: 'IMMEDIATE', desc: 'Activate targeted campaigns to rebuild patient acquisition pipeline' });
      mitigations.push({ strategy: 'Strengthen Referral Network', priority: 'SHORT-TERM', desc: 'Build partnerships with other healthcare providers for referrals' });
    } else if (t.includes('business') || t.includes('sales')) {
      mitigations.push({ strategy: 'Emergency Sales Intervention', priority: 'IMMEDIATE', desc: 'Deploy sales team with special offers to recover lost customers' });
      mitigations.push({ strategy: 'Market Repositioning', priority: 'SHORT-TERM', desc: 'Reassess market positioning and value proposition clarity' });
    } else if (t.includes('disaster') || t.includes('emergency')) {
      mitigations.push({ strategy: 'Immediate Emergency Response', priority: 'CRITICAL', desc: 'Deploy all available resources for immediate life-saving operations' });
      mitigations.push({ strategy: 'Activate Mutual Aid Agreements', priority: 'IMMEDIATE', desc: 'Call upon partner organizations for additional support capacity' });
    } else {
      mitigations.push({ strategy: 'Immediate Stakeholder Engagement', priority: 'IMMEDIATE', desc: 'Convene emergency meeting to align response strategy across all parties' });
      mitigations.push({ strategy: 'Resource Mobilization Plan', priority: 'SHORT-TERM', desc: 'Identify and allocate required resources for effective response' });
    }

    mitigations.push({ strategy: 'Establish Monitoring Dashboard', priority: 'SHORT-TERM', desc: 'Set up real-time tracking of key risk indicators and response metrics' });

    return mitigations;
  };

  // Early warning indicators
  const getWarningIndicators = (sectors, urgency) => {
    const t = sectors.join(' ').toLowerCase();
    const indicators = [];

    if (t.includes('transport') || t.includes('logistics')) {
      indicators.push('Delivery time increasing beyond 20% of baseline');
      indicators.push('Carrier dropout rate exceeding 5% monthly');
    } else if (t.includes('health') || t.includes('medical')) {
      indicators.push('Patient appointment bookings declining week over week');
      indicators.push('Online review ratings dropping below 4.0 stars');
    } else if (t.includes('business') || t.includes('sales')) {
      indicators.push('Lead conversion rate dropping below industry average');
      indicators.push('Customer churn rate exceeding 10% monthly');
    } else {
      indicators.push('Stakeholder complaints increasing beyond normal baseline');
      indicators.push('Key performance indicators declining for 2+ consecutive periods');
    }

    indicators.push('Response time to issues exceeding acceptable thresholds');
    indicators.push('Public sentiment turning negative on social monitoring');

    return indicators;
  };

  const riskFactors = getRiskFactors(sectors, insight, severity);
  const mitigations = getMitigations(sectors, insight);
  const warningIndicators = getWarningIndicators(sectors, urgency);

  const result = {
    risk_score: riskScore,
    risk_level: riskLevel,
    risk_color: riskColor,
    risk_factors: riskFactors,
    mitigation_strategies: mitigations,
    early_warning_indicators: warningIndicators,
    assessment_summary: `Risk assessment complete. Overall risk score of ${riskScore}/100 classified as ${riskLevel}. ${riskFactors.length} critical risk factors identified with ${mitigations.length} mitigation strategies recommended.`,
    assessed_at: new Date().toISOString()
  };

  console.log(`[Agent 5 - Risk] ✓ Risk Score: ${riskScore}/100`);
  console.log(`[Agent 5 - Risk] ✓ Risk Level: ${riskLevel}`);
  console.log(`[Agent 5 - Risk] ✓ Risk Factors: ${riskFactors.length}`);
  console.log('[Agent 5 - Risk] ✓ Risk Assessment COMPLETE');

  return result;
};

module.exports = agent5_risk;
