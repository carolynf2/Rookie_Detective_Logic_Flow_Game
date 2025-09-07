import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Lock, CheckCircle } from 'lucide-react';

interface Evidence {
  id: string;
  type: 'witness' | 'physical';
  description: string;
  importance: 'high' | 'medium' | 'low';
}

interface FlowchartNode {
  id: string;
  type: 'start' | 'process' | 'decision' | 'end';
  content: string;
  x: number;
  y: number;
  connections: string[];
}

interface Case {
  id: string;
  title: string;
  description: string;
  scenario: string;
  evidence: Evidence[];
  targetFlowchart: FlowchartNode[];
  targetPseudocode: string;
  hints: string[];
  estimatedDuration: number;
  completed: boolean;
  unlocked: boolean;
}

interface RookieDetectiveLevelProps {
  onCaseComplete: (caseId: string) => void;
  onLevelComplete: () => void;
}

export const RookieDetectiveLevel: React.FC<RookieDetectiveLevelProps> = ({
  onCaseComplete,
  onLevelComplete
}) => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'overview' | 'investigation'>('overview');
  const [playerFlowchart, setPlayerFlowchart] = useState<FlowchartNode[]>([]);
  const [playerPseudocode, setPlayerPseudocode] = useState<string>('');
  const [completedCases, setCompletedCases] = useState<Set<string>>(new Set());

  const cases: Case[] = [
    {
      id: 'case-1-missing-lunch',
      title: 'Missing Lunch Mystery',
      description: 'Help Sarah find her missing lunch box that disappeared during recess.',
      scenario: `Student Sarah's lunch box disappeared from her desk during recess. As a rookie detective, you need to gather evidence and create a logical flowchart to solve this mystery.`,
      evidence: [
        {
          id: 'witness-1',
          type: 'witness',
          description: 'Classmate Tom: "I saw someone near Sarah\'s desk during recess"',
          importance: 'high'
        },
        {
          id: 'physical-1',
          type: 'physical',
          description: 'Trail of sandwich crumbs leading from Sarah\'s desk to the supply closet',
          importance: 'high'
        },
        {
          id: 'witness-2',
          type: 'witness',
          description: 'Classmate Emma: "The person I saw wore a red shirt"',
          importance: 'medium'
        },
        {
          id: 'physical-2',
          type: 'physical',
          description: 'Red thread caught on the corner of Sarah\'s desk',
          importance: 'medium'
        }
      ],
      targetFlowchart: [
        { id: 'start', type: 'start', content: 'Start Investigation', x: 50, y: 50, connections: ['interview1'] },
        { id: 'interview1', type: 'process', content: 'Interview Witness 1', x: 50, y: 150, connections: ['evidence1'] },
        { id: 'evidence1', type: 'process', content: 'Check for physical evidence', x: 50, y: 250, connections: ['decision1'] },
        { id: 'decision1', type: 'decision', content: 'Found crumbs?', x: 50, y: 350, connections: ['follow-trail'] },
        { id: 'follow-trail', type: 'process', content: 'Follow crumb trail', x: 50, y: 450, connections: ['decision2'] },
        { id: 'decision2', type: 'decision', content: 'Trail leads to closet?', x: 50, y: 550, connections: ['check-closet'] },
        { id: 'check-closet', type: 'process', content: 'Check supply closet', x: 50, y: 650, connections: ['end'] },
        { id: 'end', type: 'end', content: 'Case Solved!', x: 50, y: 750, connections: [] }
      ],
      targetPseudocode: `BEGIN investigation
  INTERVIEW each witness
  COLLECT physical evidence
  IF evidence points to location THEN
    SEARCH that location
  END IF
  DOCUMENT findings
END investigation`,
      hints: [
        'Start by talking to witnesses who saw something',
        'Look for physical evidence that might lead you somewhere',
        'Follow any trails you discover',
        'Check the location where the trail leads'
      ],
      estimatedDuration: 15,
      completed: false,
      unlocked: true
    },
    {
      id: 'case-2-lost-pet',
      title: 'Lost Pet Search',
      description: 'Help find Max, the classroom hamster who escaped from his cage.',
      scenario: `Max the hamster has escaped from his cage in the classroom. Students are worried and need your detective skills to find him safely.`,
      evidence: [
        {
          id: 'witness-pet-1',
          type: 'witness',
          description: 'Student Jake: "I heard scratching sounds coming from the reading corner"',
          importance: 'high'
        },
        {
          id: 'physical-pet-1',
          type: 'physical',
          description: 'Tiny hamster droppings found near the bookshelf',
          importance: 'high'
        },
        {
          id: 'witness-pet-2',
          type: 'witness',
          description: 'Student Lisa: "I saw something small and furry run under the teacher\'s desk"',
          importance: 'medium'
        },
        {
          id: 'physical-pet-2',
          type: 'physical',
          description: 'Small teeth marks on a pencil found under the desk',
          importance: 'medium'
        },
        {
          id: 'witness-pet-3',
          type: 'witness',
          description: 'Student Alex: "Max loves hiding in dark, cozy places"',
          importance: 'low'
        }
      ],
      targetFlowchart: [
        { id: 'start', type: 'start', content: 'Start Pet Search', x: 50, y: 50, connections: ['listen'] },
        { id: 'listen', type: 'process', content: 'Listen for sounds', x: 50, y: 150, connections: ['decision-sound'] },
        { id: 'decision-sound', type: 'decision', content: 'Hear scratching?', x: 50, y: 250, connections: ['search-corner', 'check-evidence'] },
        { id: 'search-corner', type: 'process', content: 'Search reading corner', x: 200, y: 350, connections: ['decision-found'] },
        { id: 'check-evidence', type: 'process', content: 'Look for droppings', x: 50, y: 350, connections: ['search-bookshelf'] },
        { id: 'search-bookshelf', type: 'process', content: 'Search near bookshelf', x: 50, y: 450, connections: ['decision-found'] },
        { id: 'decision-found', type: 'decision', content: 'Found Max?', x: 125, y: 550, connections: ['end-found', 'search-desk'] },
        { id: 'search-desk', type: 'process', content: 'Check under teacher desk', x: 50, y: 650, connections: ['end-found'] },
        { id: 'end-found', type: 'end', content: 'Max Found Safe!', x: 125, y: 750, connections: [] }
      ],
      targetPseudocode: `BEGIN pet search
  LISTEN for sounds
  IF hear scratching THEN
    SEARCH reading corner
  ELSE
    LOOK for evidence trails
    SEARCH near evidence location
  END IF
  IF not found THEN
    CHECK additional hiding spots
  END IF
  RETURN pet to safe cage
END pet search`,
      hints: [
        'Listen carefully for any sounds Max might be making',
        'Look for physical signs that show where Max has been',
        'Think about where a small animal would feel safe hiding',
        'Check multiple locations if the first search is unsuccessful'
      ],
      estimatedDuration: 20,
      completed: false,
      unlocked: false
    },
    {
      id: 'case-3-playground-vandal',
      title: 'Playground Equipment Vandal',
      description: 'Investigate who damaged the playground equipment with multiple evidence paths.',
      scenario: `Someone has been drawing graffiti on the playground equipment. The school needs to identify the vandal to address the situation appropriately.`,
      evidence: [
        {
          id: 'witness-vandal-1',
          type: 'witness',
          description: 'Teacher Ms. Johnson: "I saw someone by the swings after school yesterday"',
          importance: 'high'
        },
        {
          id: 'physical-vandal-1',
          type: 'physical',
          description: 'Blue marker cap found near the damaged slide',
          importance: 'high'
        },
        {
          id: 'witness-vandal-2',
          type: 'witness',
          description: 'Student Maria: "I heard someone say they hate recess rules"',
          importance: 'medium'
        },
        {
          id: 'physical-vandal-2',
          type: 'physical',
          description: 'Fresh blue marker graffiti on three different pieces of equipment',
          importance: 'high'
        },
        {
          id: 'witness-vandal-3',
          type: 'witness',
          description: 'Custodian Mr. Pete: "The damage wasn\'t here during my morning check"',
          importance: 'medium'
        },
        {
          id: 'physical-vandal-3',
          type: 'physical',
          description: 'Footprints in the sand leading from the gate to the playground',
          importance: 'medium'
        }
      ],
      targetFlowchart: [
        { id: 'start', type: 'start', content: 'Start Investigation', x: 50, y: 50, connections: ['examine-damage'] },
        { id: 'examine-damage', type: 'process', content: 'Examine damaged equipment', x: 50, y: 150, connections: ['collect-evidence'] },
        { id: 'collect-evidence', type: 'process', content: 'Collect physical evidence', x: 50, y: 250, connections: ['interview-witnesses'] },
        { id: 'interview-witnesses', type: 'process', content: 'Interview all witnesses', x: 50, y: 350, connections: ['analyze-timeline'] },
        { id: 'analyze-timeline', type: 'process', content: 'Create timeline of events', x: 50, y: 450, connections: ['decision-evidence'] },
        { id: 'decision-evidence', type: 'decision', content: 'Evidence points to suspect?', x: 50, y: 550, connections: ['verify-suspect', 'gather-more'] },
        { id: 'verify-suspect', type: 'process', content: 'Verify suspect details', x: 200, y: 650, connections: ['end-solved'] },
        { id: 'gather-more', type: 'process', content: 'Gather additional evidence', x: 50, y: 650, connections: ['decision-evidence'] },
        { id: 'end-solved', type: 'end', content: 'Vandal Identified!', x: 125, y: 750, connections: [] }
      ],
      targetPseudocode: `BEGIN vandalism investigation
  EXAMINE damaged equipment
  COLLECT all physical evidence
  INTERVIEW each witness
  CREATE timeline from testimony
  ANALYZE evidence patterns
  IF evidence points to suspect THEN
    VERIFY suspect information
    DOCUMENT case details
  ELSE
    GATHER additional evidence
    REPEAT analysis
  END IF
  REPORT findings to authorities
END vandalism investigation`,
      hints: [
        'Start by carefully examining all the damage to understand the pattern',
        'Physical evidence like the marker cap is crucial - what does it tell you?',
        'Create a timeline using witness statements to narrow down when it happened',
        'Look for connections between different pieces of evidence'
      ],
      estimatedDuration: 25,
      completed: false,
      unlocked: false
    },
    {
      id: 'case-4-library-book-thief',
      title: 'Library Book Thief',
      description: 'Solve the mystery of missing library books using time-based sequencing.',
      scenario: `Several popular books have gone missing from the school library over the past week. The librarian needs help tracking down what happened to them.`,
      evidence: [
        {
          id: 'witness-lib-1',
          type: 'witness',
          description: 'Librarian Mrs. Davis: "Three mystery books were here Monday morning"',
          importance: 'high'
        },
        {
          id: 'physical-lib-1',
          type: 'physical',
          description: 'Library checkout log shows no record of the missing books being borrowed',
          importance: 'high'
        },
        {
          id: 'witness-lib-2',
          type: 'witness',
          description: 'Student Ryan: "I saw someone reading those books during Tuesday lunch"',
          importance: 'high'
        },
        {
          id: 'witness-lib-3',
          type: 'witness',
          description: 'Student Casey: "Someone was stuffing books in their backpack Wednesday"',
          importance: 'high'
        },
        {
          id: 'physical-lib-2',
          type: 'physical',
          description: 'Security camera shows the same person near mystery section Mon-Wed',
          importance: 'high'
        },
        {
          id: 'witness-lib-4',
          type: 'witness',
          description: 'Teacher Mr. Brown: "I noticed a student had many books not from our classroom"',
          importance: 'medium'
        }
      ],
      targetFlowchart: [
        { id: 'start', type: 'start', content: 'Start Book Investigation', x: 50, y: 50, connections: ['check-records'] },
        { id: 'check-records', type: 'process', content: 'Check library records', x: 50, y: 150, connections: ['decision-logged'] },
        { id: 'decision-logged', type: 'decision', content: 'Books properly checked out?', x: 50, y: 250, connections: ['investigate-theft', 'check-return'] },
        { id: 'investigate-theft', type: 'process', content: 'Investigate potential theft', x: 200, y: 350, connections: ['review-timeline'] },
        { id: 'check-return', type: 'process', content: 'Check if overdue', x: 50, y: 350, connections: ['contact-borrower'] },
        { id: 'review-timeline', type: 'process', content: 'Review timeline of events', x: 200, y: 450, connections: ['analyze-pattern'] },
        { id: 'contact-borrower', type: 'process', content: 'Contact book borrower', x: 50, y: 450, connections: ['end-resolved'] },
        { id: 'analyze-pattern', type: 'process', content: 'Analyze visitor patterns', x: 200, y: 550, connections: ['identify-suspect'] },
        { id: 'identify-suspect', type: 'process', content: 'Identify suspect from evidence', x: 200, y: 650, connections: ['end-resolved'] },
        { id: 'end-resolved', type: 'end', content: 'Books Located!', x: 125, y: 750, connections: [] }
      ],
      targetPseudocode: `BEGIN library investigation
  CHECK official checkout records
  IF books not officially borrowed THEN
    INVESTIGATE theft possibility
    REVIEW timeline of disappearance
    ANALYZE visitor patterns during timeframe
    CROSS-REFERENCE witness statements
    IDENTIFY most likely suspect
  ELSE
    CHECK if books are overdue
    CONTACT borrower for return
  END IF
  RECOVER missing books
  UPDATE security procedures
END library investigation`,
      hints: [
        'Start by checking if the books were officially borrowed or not',
        'Create a timeline of when each witness saw something suspicious',
        'Look for patterns in when and where the suspect was seen',
        'Use the security camera evidence to confirm witness statements'
      ],
      estimatedDuration: 30,
      completed: false,
      unlocked: false
    }
  ];

  const [gameState, setGameState] = useState({
    cases: cases.map(c => ({
      ...c,
      completed: completedCases.has(c.id),
      unlocked: c.id === 'case-1-missing-lunch' || completedCases.has(getPreviousCaseId(c.id))
    }))
  });

  function getPreviousCaseId(currentCaseId: string): string {
    const caseOrder = ['case-1-missing-lunch', 'case-2-lost-pet', 'case-3-playground-vandal', 'case-4-library-book-thief'];
    const currentIndex = caseOrder.indexOf(currentCaseId);
    return currentIndex > 0 ? caseOrder[currentIndex - 1] : '';
  }

  const handleCaseSelect = (caseId: string) => {
    const caseData = gameState.cases.find(c => c.id === caseId);
    if (caseData && caseData.unlocked) {
      setSelectedCase(caseId);
      setCurrentView('investigation');
      setPlayerFlowchart([]);
      setPlayerPseudocode('');
    }
  };

  const handleCaseCompletion = (caseId: string) => {
    const updatedCompletedCases = new Set(completedCases);
    updatedCompletedCases.add(caseId);
    setCompletedCases(updatedCompletedCases);
    
    const updatedCases = gameState.cases.map(c => {
      if (c.id === caseId) {
        return { ...c, completed: true };
      }
      const nextCaseId = getNextCaseId(caseId);
      if (c.id === nextCaseId) {
        return { ...c, unlocked: true };
      }
      return c;
    });
    
    setGameState({ cases: updatedCases });
    onCaseComplete(caseId);
    
    if (updatedCompletedCases.size >= Math.ceil(cases.length * 0.75)) {
      onLevelComplete();
    }
  };

  function getNextCaseId(currentCaseId: string): string {
    const caseOrder = ['case-1-missing-lunch', 'case-2-lost-pet', 'case-3-playground-vandal', 'case-4-library-book-thief'];
    const currentIndex = caseOrder.indexOf(currentCaseId);
    return currentIndex < caseOrder.length - 1 ? caseOrder[currentIndex + 1] : '';
  }

  if (currentView === 'investigation' && selectedCase) {
    const currentCase = gameState.cases.find(c => c.id === selectedCase);
    if (currentCase) {
      return (
        <CaseInvestigation
          case={currentCase}
          onComplete={() => handleCaseCompletion(selectedCase)}
          onBack={() => {
            setCurrentView('overview');
            setSelectedCase(null);
          }}
          playerFlowchart={playerFlowchart}
          setPlayerFlowchart={setPlayerFlowchart}
          playerPseudocode={playerPseudocode}
          setPlayerPseudocode={setPlayerPseudocode}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            🕵️ Rookie Detective Level
          </h1>
          <p className="text-xl text-indigo-700">
            Master Linear Logic - Learn the basics of detective flowcharts
          </p>
          <div className="mt-4 bg-white rounded-lg p-4 shadow-md">
            <div className="flex justify-center items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">Progress:</span>
              <div className="flex space-x-2">
                {gameState.cases.map((case_, index) => (
                  <div
                    key={case_.id}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      case_.completed
                        ? 'bg-green-500 text-white'
                        : case_.unlocked
                        ? 'bg-yellow-400 text-gray-800'
                        : 'bg-gray-300 text-gray-500'
                    }`}
                  >
                    {case_.completed ? '✓' : index + 1}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {completedCases.size} / {gameState.cases.length} completed
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gameState.cases.map((case_, index) => (
            <CaseCard
              key={case_.id}
              case={case_}
              index={index}
              onSelect={handleCaseSelect}
            />
          ))}
        </div>

        {completedCases.size >= Math.ceil(gameState.cases.length * 0.75) && (
          <div className="mt-8 text-center">
            <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-lg inline-block">
              <h3 className="text-xl font-bold mb-2">🎉 Congratulations!</h3>
              <p>You've completed the Rookie Detective level!</p>
              <p>You're ready to advance to Junior Detective.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface CaseCardProps {
  case: Case;
  index: number;
  onSelect: (caseId: string) => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ case: caseData, index, onSelect }) => {
  const getStatusIcon = () => {
    if (caseData.completed) return <CheckCircle className="w-6 h-6 text-green-500" />;
    if (!caseData.unlocked) return <Lock className="w-6 h-6 text-gray-400" />;
    return <Star className="w-6 h-6 text-yellow-500" />;
  };

  const getStatusText = () => {
    if (caseData.completed) return 'Solved';
    if (!caseData.unlocked) return 'Locked';
    return 'Available';
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ${
        caseData.unlocked
          ? 'hover:shadow-xl hover:scale-105 cursor-pointer'
          : 'opacity-60 cursor-not-allowed'
      }`}
      onClick={() => caseData.unlocked && onSelect(caseData.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 rounded-full p-3">
            <span className="text-2xl font-bold text-indigo-600">
              {index + 1}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{caseData.title}</h3>
            <p className="text-sm text-gray-600">{getStatusText()}</p>
          </div>
        </div>
        {getStatusIcon()}
      </div>
      
      <p className="text-gray-700 mb-4">{caseData.description}</p>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>⏱️ ~{caseData.estimatedDuration} min</span>
        <span>🔍 {caseData.evidence.length} clues</span>
      </div>
      
      {caseData.unlocked && (
        <div className="mt-4 flex items-center text-indigo-600 font-medium">
          <span>Start Investigation</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      )}
    </div>
  );
};

interface CaseInvestigationProps {
  case: Case;
  onComplete: () => void;
  onBack: () => void;
  playerFlowchart: FlowchartNode[];
  setPlayerFlowchart: (flowchart: FlowchartNode[]) => void;
  playerPseudocode: string;
  setPlayerPseudocode: (code: string) => void;
}

const CaseInvestigation: React.FC<CaseInvestigationProps> = ({
  case: caseData,
  onComplete,
  onBack,
  playerFlowchart,
  setPlayerFlowchart,
  playerPseudocode,
  setPlayerPseudocode
}) => {
  const [currentStep, setCurrentStep] = useState<'briefing' | 'evidence' | 'flowchart' | 'pseudocode' | 'complete'>('briefing');
  const [showHints, setShowHints] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const validateFlowchart = (): boolean => {
    if (playerFlowchart.length < 3) return false;
    
    const hasStart = playerFlowchart.some(node => node.type === 'start');
    const hasEnd = playerFlowchart.some(node => node.type === 'end');
    const hasProcess = playerFlowchart.some(node => node.type === 'process');
    
    return hasStart && hasEnd && hasProcess;
  };

  const validatePseudocode = (): boolean => {
    return playerPseudocode.length > 50 && 
           playerPseudocode.toUpperCase().includes('BEGIN') && 
           playerPseudocode.toUpperCase().includes('END');
  };

  const canProceedToNext = (): boolean => {
    switch (currentStep) {
      case 'briefing':
      case 'evidence':
        return true;
      case 'flowchart':
        return validateFlowchart();
      case 'pseudocode':
        return validatePseudocode();
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 'briefing') setCurrentStep('evidence');
    else if (currentStep === 'evidence') setCurrentStep('flowchart');
    else if (currentStep === 'flowchart') setCurrentStep('pseudocode');
    else if (currentStep === 'pseudocode') {
      setCurrentStep('complete');
      setTimeout(onComplete, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-purple-600 hover:text-purple-800 font-medium"
          >
            ← Back to Cases
          </button>
          
          <div className="bg-white rounded-lg px-4 py-2 shadow-md">
            <span className="text-sm font-medium text-gray-600">Step: </span>
            <span className="font-bold text-purple-600 capitalize">{currentStep}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-purple-600 text-white p-6">
            <h1 className="text-3xl font-bold mb-2">{caseData.title}</h1>
            <p className="text-purple-100">{caseData.description}</p>
          </div>

          <div className="p-6">
            {currentStep === 'briefing' && (
              <CaseBriefing scenario={caseData.scenario} />
            )}
            
            {currentStep === 'evidence' && (
              <EvidenceReview evidence={caseData.evidence} />
            )}
            
            {currentStep === 'flowchart' && (
              <FlowchartBuilder
                playerFlowchart={playerFlowchart}
                setPlayerFlowchart={setPlayerFlowchart}
                isValid={validateFlowchart()}
              />
            )}
            
            {currentStep === 'pseudocode' && (
              <PseudocodeEditor
                playerPseudocode={playerPseudocode}
                setPlayerPseudocode={setPlayerPseudocode}
                isValid={validatePseudocode()}
                targetPseudocode={caseData.targetPseudocode}
              />
            )}
            
            {currentStep === 'complete' && (
              <CaseComplete case={caseData} />
            )}
          </div>

          <div className="bg-gray-50 p-6 flex justify-between items-center">
            <div>
              {showHints && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md">
                  <p className="text-sm text-yellow-800 mb-2">
                    <strong>Hint {hintIndex + 1}:</strong>
                  </p>
                  <p className="text-sm text-yellow-700">
                    {caseData.hints[hintIndex]}
                  </p>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => setHintIndex(Math.max(0, hintIndex - 1))}
                      disabled={hintIndex === 0}
                      className="text-xs px-2 py-1 bg-yellow-200 text-yellow-800 rounded disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setHintIndex(Math.min(caseData.hints.length - 1, hintIndex + 1))}
                      disabled={hintIndex === caseData.hints.length - 1}
                      className="text-xs px-2 py-1 bg-yellow-200 text-yellow-800 rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-sm text-purple-600 hover:text-purple-800 underline"
              >
                {showHints ? 'Hide Hints' : 'Need a Hint?'}
              </button>
            </div>
            
            {currentStep !== 'complete' && (
              <button
                onClick={handleNext}
                disabled={!canProceedToNext()}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  canProceedToNext()
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentStep === 'pseudocode' ? 'Submit Solution' : 'Continue'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseBriefing: React.FC<{ scenario: string }> = ({ scenario }) => (
  <div className="text-center py-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Case Briefing</h2>
    <div className="max-w-2xl mx-auto bg-blue-50 rounded-lg p-6">
      <p className="text-lg text-gray-700 leading-relaxed">{scenario}</p>
    </div>
    <div className="mt-6 text-sm text-gray-600">
      <p>Read the briefing carefully, then click Continue to examine the evidence.</p>
    </div>
  </div>
);

const EvidenceReview: React.FC<{ evidence: Evidence[] }> = ({ evidence }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Evidence Collection</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {evidence.map((item, index) => (
        <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
              item.type === 'witness' ? 'bg-blue-500' : 'bg-green-500'
            }`}>
              {item.type === 'witness' ? '👤' : '🔍'}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-gray-600 capitalize">{item.type}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.importance === 'high' ? 'bg-red-100 text-red-800' :
                  item.importance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.importance} importance
                </span>
              </div>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-6 text-center text-sm text-gray-600">
      <p>Review all evidence carefully. You'll use this information to build your flowchart.</p>
    </div>
  </div>
);

const FlowchartBuilder: React.FC<{
  playerFlowchart: FlowchartNode[];
  setPlayerFlowchart: (flowchart: FlowchartNode[]) => void;
  isValid: boolean;
}> = ({ playerFlowchart, setPlayerFlowchart, isValid }) => {
  const [selectedTool, setSelectedTool] = useState<'start' | 'process' | 'decision' | 'end'>('start');
  
  const addNode = (type: FlowchartNode['type']) => {
    const newNode: FlowchartNode = {
      id: `node-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 100,
      connections: []
    };
    setPlayerFlowchart([...playerFlowchart, newNode]);
  };

  const getDefaultContent = (type: FlowchartNode['type']): string => {
    switch (type) {
      case 'start': return 'Start Investigation';
      case 'process': return 'Action Step';
      case 'decision': return 'Decision Point?';
      case 'end': return 'Case Solved!';
      default: return 'New Step';
    }
  };

  const clearFlowchart = () => {
    setPlayerFlowchart([]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Build Your Flowchart</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Flowchart Tools</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { type: 'start' as const, label: 'Start/End', color: 'bg-green-500', icon: '⭕' },
            { type: 'process' as const, label: 'Process', color: 'bg-blue-500', icon: '📋' },
            { type: 'decision' as const, label: 'Decision', color: 'bg-yellow-500', icon: '🤔' },
            { type: 'end' as const, label: 'End', color: 'bg-red-500', icon: '🎯' }
          ].map(tool => (
            <button
              key={tool.type}
              onClick={() => addNode(tool.type)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-all hover:scale-105 ${tool.color}`}
            >
              <span>{tool.icon}</span>
              <span>Add {tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 min-h-96 relative border-2 border-dashed border-gray-300">
        {playerFlowchart.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-lg mb-2">Your flowchart will appear here</p>
              <p className="text-sm">Start by adding a "Start/End" node</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {playerFlowchart.map((node, index) => (
              <div key={node.id} className="flex items-center space-x-4">
                <div className={`px-4 py-2 rounded-lg text-white font-medium ${
                  node.type === 'start' ? 'bg-green-500' :
                  node.type === 'process' ? 'bg-blue-500' :
                  node.type === 'decision' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}>
                  {node.content}
                </div>
                {index < playerFlowchart.length - 1 && (
                  <div className="text-gray-400">→</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={clearFlowchart}
          className="px-4 py-2 text-red-600 hover:text-red-800 underline"
        >
          Clear Flowchart
        </button>
        
        <div className={`px-4 py-2 rounded-lg font-medium ${
          isValid ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
        }`}>
          {isValid ? '✅ Flowchart looks good!' : '⚠️ Add start, process, and end nodes'}
        </div>
      </div>
    </div>
  );
};

const PseudocodeEditor: React.FC<{
  playerPseudocode: string;
  setPlayerPseudocode: (code: string) => void;
  isValid: boolean;
  targetPseudocode: string;
}> = ({ playerPseudocode, setPlayerPseudocode, isValid, targetPseudocode }) => {
  const [showExample, setShowExample] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Write Your Pseudocode</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Your Solution</h3>
          <textarea
            value={playerPseudocode}
            onChange={(e) => setPlayerPseudocode(e.target.value)}
            placeholder="BEGIN investigation&#10;  STEP 1: Describe your first action&#10;  STEP 2: Add your next step&#10;  IF condition THEN&#10;    ACTION if true&#10;  END IF&#10;END investigation"
            className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
          <div className={`mt-2 text-sm ${isValid ? 'text-green-600' : 'text-orange-600'}`}>
            {isValid ? '✅ Good structure! Make sure your logic matches your flowchart.' : '⚠️ Remember to use BEGIN/END and describe your investigation steps.'}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-700">Pseudocode Tips</h3>
            <button
              onClick={() => setShowExample(!showExample)}
              className="text-sm text-purple-600 hover:text-purple-800 underline"
            >
              {showExample ? 'Hide Example' : 'Show Example'}
            </button>
          </div>
          
          {showExample ? (
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-600 mb-2">Example Structure:</p>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">{targetPseudocode}</pre>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Key Elements:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Start with BEGIN and end with END</li>
                  <li>• Use IF/THEN for decisions</li>
                  <li>• Describe actions clearly</li>
                  <li>• Follow logical sequence</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Common Keywords:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• INTERVIEW, SEARCH, CHECK</li>
                  <li>• COLLECT, ANALYZE, DOCUMENT</li>
                  <li>• IF, THEN, ELSE, END IF</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CaseComplete: React.FC<{ case: Case }> = ({ case: caseData }) => (
  <div className="text-center py-12">
    <div className="mb-8">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-3xl font-bold text-green-600 mb-2">Case Solved!</h2>
      <p className="text-xl text-gray-700">Excellent detective work on "{caseData.title}"</p>
    </div>
    
    <div className="max-w-2xl mx-auto bg-green-50 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-green-800 mb-3">What you learned:</h3>
      <ul className="text-green-700 space-y-2">
        <li>✅ How to organize evidence logically</li>
        <li>✅ Creating flowcharts for investigation processes</li>
        <li>✅ Writing pseudocode to document your thinking</li>
        <li>✅ Following a systematic approach to problem-solving</li>
      </ul>
    </div>
    
    <div className="text-gray-600">
      <p>Returning to case selection in a moment...</p>
    </div>
  </div>
);

export default RookieDetectiveLevel;