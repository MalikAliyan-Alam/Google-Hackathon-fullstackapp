const agent3_decision = async (agent2Output) => {
  console.log('[Agent 3 - Decision] ✓ Received insights from Agent 2');
  console.log('[Agent 3 - Decision] ✓ Generating dynamic actions based on content...');

  await new Promise(resolve => setTimeout(resolve, 1500));

  const text = agent2Output.source_topic?.toLowerCase() || '';
  const insight = agent2Output.core_insight?.toLowerCase() || '';
  const sectors = agent2Output.affected_sectors || [];
  const severity = agent2Output.severity;
  const urgency = agent2Output.urgency;

  const getActions = (sectors, insight) => {
    const combined = (sectors.join(' ') + ' ' + insight).toLowerCase();

    if (combined.includes('education') || combined.includes('academic') || combined.includes('student') || combined.includes('curriculum')) {
      return [
        {
          action_id: 'A1',
          title: 'Launch Emergency Academic Support Program',
          description: 'Deploy supplementary learning resources, tutoring programs and academic counseling for affected students',
          expected_outcome: 'Academic support activated reaching all enrolled students with measurable improvement targets',
          affected_records: 45000,
          priority: 1,
          simulate: true
        },
        {
          action_id: 'A2',
          title: 'Implement Digital Learning Platform',
          description: 'Enable online learning management system with curated content, assessments and progress tracking',
          expected_outcome: 'Digital platform deployed for teachers and students with 24/7 access to learning materials',
          affected_records: 46200,
          priority: 2,
          simulate: false
        },
        {
          action_id: 'A3',
          title: 'Schedule Teacher Professional Development',
          description: 'Organize mandatory training sessions to upgrade teaching methodologies and digital skills',
          expected_outcome: 'All teaching staff trained with updated pedagogy and digital teaching tools',
          affected_records: 1200,
          priority: 3,
          simulate: false
        }
      ];
    }

    if (combined.includes('health') || combined.includes('medical') || combined.includes('patient') || combined.includes('clinic') || combined.includes('dental')) {
      return [
        {
          action_id: 'A1',
          title: 'Launch Targeted Patient Acquisition Campaign',
          description: 'Activate digital marketing across Google, Facebook and local platforms targeting patients within service radius',
          expected_outcome: 'Campaign live reaching 15,000 potential patients with appointment booking integration',
          affected_records: 15000,
          priority: 1,
          simulate: true
        },
        {
          action_id: 'A2',
          title: 'Implement Patient Referral and Loyalty Program',
          description: 'Create referral incentive system and loyalty rewards for existing patients to drive word-of-mouth growth',
          expected_outcome: 'Program activated for all existing patients with automated referral tracking',
          affected_records: 340,
          priority: 2,
          simulate: false
        },
        {
          action_id: 'A3',
          title: 'Optimize Digital Presence and Reviews',
          description: 'Update Google My Business, healthcare directories and collect verified patient reviews',
          expected_outcome: 'Digital presence optimized with 40% increase in local search visibility',
          affected_records: 1,
          priority: 3,
          simulate: false
        }
      ];
    }

    if (combined.includes('business') || combined.includes('sales') || combined.includes('revenue') || combined.includes('leads') || combined.includes('marketing')) {
      return [
        {
          action_id: 'A1',
          title: 'Activate Multi-Channel Lead Generation Campaign',
          description: 'Launch integrated lead generation across social media, email marketing, SEO and paid search channels',
          expected_outcome: 'Campaign active across all channels targeting qualified prospects with conversion tracking',
          affected_records: 25000,
          priority: 1,
          simulate: true
        },
        {
          action_id: 'A2',
          title: 'Deploy CRM and Sales Pipeline System',
          description: 'Implement automated CRM for lead tracking, follow-up sequences and sales pipeline management',
          expected_outcome: 'CRM configured with automated follow-ups and sales team dashboard activated',
          affected_records: 500,
          priority: 2,
          simulate: false
        },
        {
          action_id: 'A3',
          title: 'Launch Customer Retention and Loyalty Program',
          description: 'Create structured loyalty program with incentives for repeat purchases and referrals',
          expected_outcome: 'Retention program live for all existing customers with automated engagement',
          affected_records: 1200,
          priority: 3,
          simulate: false
        }
      ];
    }

    if (combined.includes('energy') || combined.includes('fuel') || combined.includes('petrol') || combined.includes('transport')) {
      return [
        {
          action_id: 'A1',
          title: 'Update National Transport Pricing Framework',
          description: 'Revise all transport and logistics pricing to reflect current fuel cost changes across the network',
          expected_outcome: 'Pricing framework updated for all registered carriers with immediate effect',
          affected_records: 1247,
          priority: 1,
          simulate: true
        },
        {
          action_id: 'A2',
          title: 'Issue Official Cost Advisory to Stakeholders',
          description: 'Publish and distribute official cost impact advisory to all registered vendors and partners',
          expected_outcome: 'Advisory distributed to all active vendors within 24 hours',
          affected_records: 847,
          priority: 2,
          simulate: false
        },
        {
          action_id: 'A3',
          title: 'Review and Renegotiate Fixed-Price Contracts',
          description: 'Identify all at-risk fixed-price contracts and initiate renegotiation process',
          expected_outcome: 'All high-risk contracts flagged and assigned to contract management team',
          affected_records: 14,
          priority: 3,
          simulate: false
        }
      ];
    }

    if (combined.includes('finance') || combined.includes('economy') || combined.includes('bank') || combined.includes('tax') || combined.includes('inflation')) {
      return [
        {
          action_id: 'A1',
          title: 'Issue Financial Impact Advisory',
          description: 'Publish comprehensive financial impact assessment and compliance guidance for all stakeholders',
          expected_outcome: 'Advisory distributed to all registered businesses and financial institutions',
          affected_records: 3400,
          priority: 1,
          simulate: true
        },
        {
          action_id: 'A2',
          title: 'Update Financial Compliance Systems',
          description: 'Revise financial systems, tax calculations and reporting frameworks to reflect policy changes',
          expected_outcome: 'All financial systems updated with new parameters and compliance checks',
          affected_records: 890000,
          priority: 2,
          simulate: false
        },
        {
          action_id: 'A3',
          title: 'Launch Business Support and Relief Program',
          description: 'Activate targeted financial support measures for most affected businesses and sectors',
          expected_outcome: 'Support program available to all eligible businesses with streamlined application',
          affected_records: 12000,
          priority: 3,
          simulate: false
        }
      ];
    }

    if (combined.includes('disaster') || combined.includes('emergency') || combined.includes('flood') || combined.includes('crisis') || combined.includes('relief')) {
      return [
        {
          action_id: 'A1',
          title: 'Activate Emergency Relief Operations',
          description: 'Deploy emergency response teams with relief supplies, medical aid and rescue equipment to affected areas',
          expected_outcome: 'Emergency relief operations active across all affected districts with 24/7 coverage',
          affected_records: 45000,
          priority: 1,
          simulate: true
        },
        {
          action_id: 'A2',
          title: 'Deploy Mobile Relief and Medical Units',
          description: 'Dispatch mobile units with medical teams, food supplies and emergency shelter to worst affected zones',
          expected_outcome: 'Mobile units covering all affected areas with medical and food distribution active',
          affected_records: 50,
          priority: 2,
          simulate: false
        },
        {
          action_id: 'A3',
          title: 'Activate Emergency Communication Network',
          description: 'Enable emergency broadcast system for real-time public updates and evacuation guidance',
          expected_outcome: 'Emergency alerts reaching all citizens in affected regions via multiple channels',
          affected_records: 2300000,
          priority: 3,
          simulate: false
        }
      ];
    }

    if (combined.includes('career') || combined.includes('resume') || combined.includes('employment') || combined.includes('job') || combined.includes('skills')) {
      return [
        {
          action_id: 'A1',
          title: 'Optimize Professional Profile and Resume',
          description: 'Restructure resume with quantified achievements, ATS optimization and strategic keyword placement',
          expected_outcome: 'Professional profile optimized for target roles with 60% higher ATS pass rate',
          affected_records: 1,
          priority: 1,
          simulate: true
        },
        {
          action_id: 'A2',
          title: 'Launch Targeted Job Application Campaign',
          description: 'Identify and apply to top matching positions with customized cover letters and follow-up strategy',
          expected_outcome: 'Applications submitted to 50 highly matched positions with tracking system',
          affected_records: 50,
          priority: 2,
          simulate: false
        },
        {
          action_id: 'A3',
          title: 'Activate Professional Network and LinkedIn',
          description: 'Optimize LinkedIn profile, connect with industry professionals and engage with target company content',
          expected_outcome: 'Professional network expanded with 200+ relevant connections and recruiter visibility',
          affected_records: 200,
          priority: 3,
          simulate: false
        }
      ];
    }

    if (combined.includes('security') || combined.includes('crime') || combined.includes('cyber') || combined.includes('fraud') || combined.includes('threat')) {
      return [
        {
          action_id: 'A1',
          title: 'Activate Security Response Protocol',
          description: 'Deploy security response teams and activate enhanced monitoring across all vulnerable points',
          expected_outcome: 'Security protocol active with response teams deployed and monitoring operational',
          affected_records: 340,
          priority: 1,
          simulate: true
        },
        {
          action_id: 'A2',
          title: 'Issue Public Safety Advisory',
          description: 'Broadcast safety guidelines and precautionary measures through all available communication channels',
          expected_outcome: 'Safety advisory reaching all citizens in affected area via SMS, social media and broadcast',
          affected_records: 4500000,
          priority: 2,
          simulate: false
        },
        {
          action_id: 'A3',
          title: 'Coordinate Multi-Agency Response',
          description: 'Establish unified command structure with all relevant agencies for coordinated response',
          expected_outcome: 'All relevant agencies coordinated under unified command with clear responsibilities',
          affected_records: 12,
          priority: 3,
          simulate: false
        }
      ];
    }

    if (combined.includes('technology') || combined.includes('digital') || combined.includes('software') || combined.includes('system') || combined.includes('data')) {
      return [
        {
          action_id: 'A1',
          title: 'Deploy Critical Technology Update',
          description: 'Release urgent system update addressing identified technology gaps, vulnerabilities or performance issues',
          expected_outcome: 'Technology update deployed across all systems with performance improvement verified',
          affected_records: 4500,
          priority: 1,
          simulate: true
        },
        {
          action_id: 'A2',
          title: 'Activate Enhanced Security and Monitoring',
          description: 'Enable comprehensive security monitoring, threat detection and incident response capabilities',
          expected_outcome: 'Security monitoring active across all endpoints with real-time alerting',
          affected_records: 890,
          priority: 2,
          simulate: false
        },
        {
          action_id: 'A3',
          title: 'Launch User Training and Adoption Program',
          description: 'Conduct mandatory training sessions to ensure effective system adoption and security awareness',
          expected_outcome: 'Training program completed for all system users with competency verification',
          affected_records: 12000,
          priority: 3,
          simulate: false
        }
      ];
    }

    if (combined.includes('policy') || combined.includes('government') || combined.includes('regulation') || combined.includes('law') || combined.includes('ministry')) {
      return [
        {
          action_id: 'A1',
          title: 'Issue Official Policy Implementation Directive',
          description: 'Draft, approve and distribute comprehensive implementation directive to all relevant departments',
          expected_outcome: 'Official directive published and acknowledged by all departments and stakeholders',
          affected_records: 2340,
          priority: 1,
          simulate: true
        },
        {
          action_id: 'A2',
          title: 'Conduct Mandatory Stakeholder Briefings',
          description: 'Organize and conduct briefing sessions for all affected institutional stakeholders',
          expected_outcome: 'All key stakeholders briefed with Q&A sessions and compliance guidance provided',
          affected_records: 156,
          priority: 2,
          simulate: false
        },
        {
          action_id: 'A3',
          title: 'Launch Public Awareness Campaign',
          description: 'Activate multi-channel public communication campaign about policy changes and citizen implications',
          expected_outcome: 'Awareness campaign live across all channels reaching target population effectively',
          affected_records: 5000000,
          priority: 3,
          simulate: false
        }
      ];
    }

    // Default general actions
    return [
      {
        action_id: 'A1',
        title: 'Issue Strategic Response Directive',
        description: 'Develop and publish comprehensive response strategy addressing all identified issues and stakeholder concerns',
        expected_outcome: 'Response directive published and distributed to all relevant departments and stakeholders',
        affected_records: 2340,
        priority: 1,
        simulate: true
      },
      {
        action_id: 'A2',
        title: 'Convene Emergency Stakeholder Council',
        description: 'Organize urgent multi-stakeholder meeting for coordinated response planning and resource allocation',
        expected_outcome: 'Emergency council convened with all key decision makers and action plan agreed',
        affected_records: 156,
        priority: 2,
        simulate: false
      },
      {
        action_id: 'A3',
        title: 'Launch Public Communication Campaign',
        description: 'Activate targeted awareness and communication campaign across all available channels',
        expected_outcome: 'Campaign live across all channels reaching target audience with key messages',
        affected_records: 5000000,
        priority: 3,
        simulate: false
      }
    ];
  };

  const actions = getActions(sectors, insight);

  const decision = {
    situation_summary: `${severity.toUpperCase()} severity situation identified in ${sectors.slice(0, 2).join(' and ')} requiring ${urgency} strategic action and coordinated stakeholder response.`,
    recommended_actions: actions,
    top_action: 'A1',
    reasoning: `Action A1 is highest priority as it directly addresses the core challenge in ${sectors[0]} with immediate measurable outcomes and the broadest stakeholder impact.`
  };

  console.log('[Agent 3 - Decision] ✓ Dynamic actions generated successfully');
  console.log(`[Agent 3 - Decision] ✓ Actions: ${decision.recommended_actions.length}`);
  console.log('[Agent 3 - Decision] ✓ Passing to Agent 4...');

  return {
    ...decision,
    severity: agent2Output.severity,
    urgency: agent2Output.urgency,
    source_topic: agent2Output.source_topic,
    detected_domain: 'dynamic'
  };
};

module.exports = agent3_decision;
