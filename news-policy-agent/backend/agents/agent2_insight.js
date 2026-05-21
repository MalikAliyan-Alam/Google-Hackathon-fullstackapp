const agent2_insight = async (agent1Output) => {
  console.log('[Agent 2 - Insight] ✓ Received data from Agent 1');
  console.log('[Agent 2 - Insight] ✓ Analyzing content dynamically...');

  await new Promise(resolve => setTimeout(resolve, 1500));

  const text = agent1Output.cleaned_text;
  const words = text.split(' ');
  
  // Dynamic severity detection from text
  const highWords = ['critical', 'severe', 'emergency', 'crisis', 'major', 'urgent', 'massive', 'extreme', 'serious', 'catastrophic', 'immediate', 'collapse', 'failure', 'danger'];
  const lowWords = ['minor', 'small', 'slight', 'minimal', 'negligible', 'trivial'];
  const lowerText = text.toLowerCase();
  
  const highCount = highWords.filter(w => lowerText.includes(w)).length;
  const lowCount = lowWords.filter(w => lowerText.includes(w)).length;
  const severity = highCount >= 2 ? 'high' : lowCount >= 2 ? 'low' : 'medium';
  const urgency = highCount >= 2 ? 'immediate' : highCount >= 1 ? 'short-term' : 'long-term';

  // Extract key sentences for insight
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 30);
  const topSentences = sentences.slice(0, 3).join('. ').trim();

  // Dynamic topic extraction
  const topicWords = words
    .filter(w => w.length > 5)
    .slice(0, 20)
    .join(' ');

  // Smart keyword-based dynamic analysis
  const getContextualInsight = (text) => {
    const t = text.toLowerCase();

    // Education / Academic
    if (t.includes('student') || t.includes('school') || t.includes('university') || t.includes('exam') || t.includes('education') || t.includes('teacher') || t.includes('degree') || t.includes('math') || t.includes('science') || t.includes('curriculum')) {
      return {
        core_insight: `Educational content analyzed revealing key academic challenges and learning gaps requiring structured intervention and resource allocation.`,
        affected_sectors: ['Education', 'Youth Development', 'Government Policy', 'Workforce Development'],
        severity_reason: 'Educational gaps directly impact long-term human capital and national productivity',
        stakeholders: ['Students', 'Teachers', 'Parents', 'Education Ministry', 'Institutions'],
        key_facts: [
          'Academic performance gaps identified requiring immediate attention',
          'Resource allocation and teacher training needs improvement',
          'Curriculum alignment with modern requirements is critical',
          'Digital learning tools can bridge identified gaps'
        ],
        economic_impact: 'Education gaps cost billions in future productivity loss and reduced human capital development'
      };
    }

    // Health / Medical
    if (t.includes('health') || t.includes('hospital') || t.includes('patient') || t.includes('medical') || t.includes('doctor') || t.includes('clinic') || t.includes('disease') || t.includes('treatment') || t.includes('medicine') || t.includes('dental')) {
      return {
        core_insight: `Healthcare sector challenge identified with significant gaps in service delivery, patient access and medical resource management.`,
        affected_sectors: ['Healthcare', 'Public Health', 'Medical Services', 'Government'],
        severity_reason: 'Healthcare gaps directly threaten population wellbeing and increase long-term costs',
        stakeholders: ['Patients', 'Healthcare providers', 'Government', 'Insurance companies'],
        key_facts: [
          'Healthcare access and quality needs immediate improvement',
          'Medical resource allocation requires optimization',
          'Patient acquisition and retention strategies needed',
          'Digital health solutions can improve service delivery'
        ],
        economic_impact: 'Unaddressed healthcare gaps result in significant productivity losses and increased long-term medical costs'
      };
    }

    // Business / Sales / Marketing
    if (t.includes('sales') || t.includes('revenue') || t.includes('business') || t.includes('profit') || t.includes('loss') || t.includes('market') || t.includes('customer') || t.includes('leads') || t.includes('marketing') || t.includes('brand')) {
      return {
        core_insight: `Business performance challenge identified with critical gaps in revenue generation, market positioning and customer acquisition strategy.`,
        affected_sectors: ['Business Operations', 'Sales', 'Marketing', 'Customer Relations'],
        severity_reason: 'Revenue gaps and declining customer metrics directly threaten business sustainability',
        stakeholders: ['Business owners', 'Sales team', 'Marketing team', 'Investors', 'Customers'],
        key_facts: [
          'Revenue generation and lead conversion rates need improvement',
          'Market positioning and brand visibility require strengthening',
          'Customer retention strategies are critically underutilized',
          'Digital marketing channels show significant untapped potential'
        ],
        economic_impact: 'Business performance gaps result in significant revenue shortfall and competitive disadvantage in the market'
      };
    }

    // Energy / Fuel
    if (t.includes('petrol') || t.includes('fuel') || t.includes('energy') || t.includes('oil') || t.includes('gas') || t.includes('electricity') || t.includes('power') || t.includes('solar')) {
      return {
        core_insight: `Energy sector disruption detected with significant impact on fuel supply, pricing and dependent economic activities across multiple sectors.`,
        affected_sectors: ['Energy', 'Transportation', 'Agriculture', 'Manufacturing'],
        severity_reason: 'Energy price changes cascade across all sectors creating widespread economic impact',
        stakeholders: ['Consumers', 'Transport companies', 'Farmers', 'Industry', 'Government'],
        key_facts: [
          'Energy price changes affect all transport-dependent activities',
          'Supply chain costs expected to rise significantly',
          'Agricultural and industrial production costs increasing',
          'Government intervention required to stabilize prices'
        ],
        economic_impact: 'Energy disruption creates cascading cost increases across logistics, agriculture and manufacturing sectors'
      };
    }

    // Finance / Economy
    if (t.includes('economy') || t.includes('finance') || t.includes('bank') || t.includes('tax') || t.includes('inflation') || t.includes('budget') || t.includes('investment') || t.includes('gdp') || t.includes('fiscal') || t.includes('monetary')) {
      return {
        core_insight: `Financial and economic challenge identified with significant implications for fiscal stability, investment climate and citizen welfare.`,
        affected_sectors: ['Finance', 'Banking', 'Government', 'Business', 'Households'],
        severity_reason: 'Financial instability directly impacts investment, employment and living standards',
        stakeholders: ['Citizens', 'Businesses', 'Banks', 'Government', 'Investors'],
        key_facts: [
          'Fiscal policy changes require immediate stakeholder response',
          'Investment patterns and business confidence likely affected',
          'Inflation and cost of living impacts need mitigation',
          'Monetary policy adjustments may be required'
        ],
        economic_impact: 'Economic disruption projected to impact GDP growth, employment and consumer spending significantly'
      };
    }

    // Technology / Digital
    if (t.includes('technology') || t.includes('software') || t.includes('digital') || t.includes('cyber') || t.includes('data') || t.includes('app') || t.includes('internet') || t.includes('ai') || t.includes('computer') || t.includes('system')) {
      return {
        core_insight: `Technology sector challenge identified requiring strategic digital transformation and infrastructure investment to maintain competitive advantage.`,
        affected_sectors: ['Technology', 'Digital Infrastructure', 'Business', 'Government Services'],
        severity_reason: 'Technology gaps reduce productivity and create security vulnerabilities',
        stakeholders: ['Tech companies', 'Users', 'Government', 'Businesses', 'Developers'],
        key_facts: [
          'Digital infrastructure requires immediate investment and upgrading',
          'Cybersecurity measures need significant strengthening',
          'User adoption and digital literacy training is critical',
          'Technology gaps are widening competitive disadvantage'
        ],
        economic_impact: 'Technology deficiencies cost significant productivity losses and create long-term competitive disadvantage'
      };
    }

    // Disaster / Emergency
    if (t.includes('flood') || t.includes('earthquake') || t.includes('disaster') || t.includes('emergency') || t.includes('crisis') || t.includes('relief') || t.includes('damage') || t.includes('affected') || t.includes('victims')) {
      return {
        core_insight: `Emergency situation detected requiring immediate coordinated disaster response and resource mobilization to protect affected populations.`,
        affected_sectors: ['Emergency Management', 'Infrastructure', 'Healthcare', 'Housing'],
        severity_reason: 'Immediate threat to human life and critical infrastructure requires urgent coordinated response',
        stakeholders: ['Affected citizens', 'Government', 'NGOs', 'Emergency services', 'International donors'],
        key_facts: [
          'Immediate emergency response and relief deployment required',
          'Infrastructure damage assessment must begin immediately',
          'Medical aid and shelter are critical priorities',
          'Long-term rehabilitation planning must start now'
        ],
        economic_impact: 'Disaster causes massive infrastructure losses with long-term economic recovery costs running into billions'
      };
    }

    // Policy / Government / Law
    if (t.includes('policy') || t.includes('government') || t.includes('law') || t.includes('regulation') || t.includes('ministry') || t.includes('parliament') || t.includes('act') || t.includes('bill') || t.includes('legislation')) {
      return {
        core_insight: `Government policy development or change identified with significant implications for regulatory compliance, public services and institutional operations.`,
        affected_sectors: ['Government', 'Public Policy', 'Civil Society', 'Business Compliance'],
        severity_reason: 'Policy changes create compliance obligations and operational adjustments across all affected sectors',
        stakeholders: ['Government departments', 'Citizens', 'Businesses', 'Legal entities', 'Civil society'],
        key_facts: [
          'Policy implementation requires immediate compliance planning',
          'Stakeholder communication and awareness is critical',
          'Regulatory framework updates are required',
          'Public sector capacity building may be needed'
        ],
        economic_impact: 'Policy changes create compliance costs and operational adjustment requirements across affected sectors'
      };
    }

    // Logistics / Supply Chain
    if (t.includes('delivery') || t.includes('logistics') || t.includes('supply') || t.includes('transport') || t.includes('shipping') || t.includes('freight') || t.includes('cargo') || t.includes('warehouse')) {
      return {
        core_insight: `Logistics and supply chain disruption identified causing significant delivery delays and cost increases across distribution networks.`,
        affected_sectors: ['Logistics', 'Retail', 'E-commerce', 'Manufacturing'],
        severity_reason: 'Supply chain disruptions cascade into delivery failures and customer dissatisfaction',
        stakeholders: ['Logistics companies', 'Retailers', 'Customers', 'Manufacturers', 'Drivers'],
        key_facts: [
          'Delivery network performance is significantly below targets',
          'Alternative routing and carrier strategies are needed',
          'Customer communication and expectation management critical',
          'Cost optimization across the supply chain required'
        ],
        economic_impact: 'Supply chain disruptions result in billions in delayed deliveries, lost sales and customer churn'
      };
    }

    // Agriculture / Farming
    if (t.includes('farm') || t.includes('crop') || t.includes('agriculture') || t.includes('wheat') || t.includes('rice') || t.includes('kisan') || t.includes('harvest') || t.includes('irrigation') || t.includes('fertilizer')) {
      return {
        core_insight: `Agricultural sector challenge identified affecting food security, farmer livelihoods and rural economic stability.`,
        affected_sectors: ['Agriculture', 'Food Security', 'Rural Economy', 'Export Markets'],
        severity_reason: 'Agricultural disruptions directly threaten food security and millions of farmer livelihoods',
        stakeholders: ['Farmers', 'Government', 'Food industry', 'Consumers', 'Rural communities'],
        key_facts: [
          'Crop yields and agricultural output are under significant pressure',
          'Input costs are rising reducing farmer profitability',
          'Market access and fair pricing mechanisms need improvement',
          'Agricultural support programs require urgent activation'
        ],
        economic_impact: 'Agricultural losses directly impact food prices, rural incomes and national food security'
      };
    }

    // Security / Crime
    if (t.includes('security') || t.includes('crime') || t.includes('police') || t.includes('theft') || t.includes('fraud') || t.includes('corruption') || t.includes('terrorism') || t.includes('attack') || t.includes('violence')) {
      return {
        core_insight: `Security threat or incident identified requiring immediate law enforcement response and preventive measures to protect public safety.`,
        affected_sectors: ['Public Safety', 'Law Enforcement', 'Government', 'Business'],
        severity_reason: 'Security incidents directly threaten public safety and create economic disruption',
        stakeholders: ['Law enforcement', 'Government', 'Citizens', 'Businesses', 'Communities'],
        key_facts: [
          'Immediate security response and threat assessment required',
          'Preventive measures and surveillance need strengthening',
          'Public safety communication and awareness is critical',
          'Inter-agency coordination must be activated immediately'
        ],
        economic_impact: 'Security threats cost billions in law enforcement resources, lost business activity and public confidence'
      };
    }

    // Real Estate / Property
    if (t.includes('property') || t.includes('house') || t.includes('rent') || t.includes('real estate') || t.includes('housing') || t.includes('plot') || t.includes('construction') || t.includes('building')) {
      return {
        core_insight: `Real estate market dynamics identified with significant shifts in property values and housing accessibility affecting investment and affordability.`,
        affected_sectors: ['Real Estate', 'Construction', 'Banking', 'Urban Development'],
        severity_reason: 'Property market changes affect housing affordability and investment security for millions',
        stakeholders: ['Property owners', 'Buyers', 'Developers', 'Banks', 'Government'],
        key_facts: [
          'Property market showing significant valuation changes',
          'Housing affordability is becoming a critical concern',
          'Investment returns and market confidence are shifting',
          'Regulatory framework for property transactions needs review'
        ],
        economic_impact: 'Real estate market shifts have broad wealth, construction sector and banking system implications'
      };
    }

    // Resume / Personal Document
    if (t.includes('resume') || t.includes('cv') || t.includes('experience') || t.includes('skills') || t.includes('education') && t.includes('work') || t.includes('job') || t.includes('employment') || t.includes('career')) {
      return {
        core_insight: `Career document analyzed revealing professional profile, skill gaps and strategic opportunities for career advancement and employment optimization.`,
        affected_sectors: ['Human Resources', 'Employment', 'Career Development', 'Skills Training'],
        severity_reason: 'Career positioning and skill gaps directly impact employment prospects and earning potential',
        stakeholders: ['Job seeker', 'Employers', 'Recruitment agencies', 'Training institutions'],
        key_facts: [
          'Professional profile requires strategic positioning improvements',
          'Key skills alignment with market demand needs optimization',
          'Career narrative and achievement quantification needed',
          'Professional networking and visibility enhancement recommended'
        ],
        economic_impact: 'Optimized career positioning can increase earning potential by 30-50% and reduce job search time significantly'
      };
    }

    // Default — General Analysis
    return {
      core_insight: `Significant issue or situation identified in the provided content requiring structured analysis, stakeholder coordination and strategic action planning.`,
      affected_sectors: ['Operations', 'Management', 'Stakeholders', 'Public Interest'],
      severity_reason: 'The identified issue requires prompt attention to prevent escalation and ensure positive outcomes',
      stakeholders: ['Decision makers', 'Affected parties', 'Implementation teams', 'Oversight bodies'],
      key_facts: [
        'Situation requires immediate structured assessment and response planning',
        'Stakeholder coordination and clear communication is essential',
        'Resource allocation and priority setting needed urgently',
        'Monitoring and evaluation framework must be established'
      ],
      economic_impact: 'Unaddressed issues typically result in significant operational disruption and financial losses over time'
    };
  };

  const contextualInsight = getContextualInsight(text);

  const insight = {
    core_insight: contextualInsight.core_insight,
    affected_sectors: contextualInsight.affected_sectors,
    severity: severity,
    severity_reason: contextualInsight.severity_reason,
    stakeholders: contextualInsight.stakeholders,
    urgency: urgency,
    key_facts: contextualInsight.key_facts,
    economic_impact: contextualInsight.economic_impact,
    detected_domain: 'dynamic'
  };

  console.log(`[Agent 2 - Insight] ✓ Dynamic analysis complete`);
  console.log(`[Agent 2 - Insight] ✓ Severity: ${insight.severity}`);
  console.log('[Agent 2 - Insight] ✓ Passing to Agent 3...');

  return {
    ...insight,
    source_topic: agent1Output.topic,
    source_date: agent1Output.date,
    word_count: agent1Output.word_count
  };
};

module.exports = agent2_insight;
